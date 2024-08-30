document.addEventListener("DOMContentLoaded", () => {
    const idstart = document.getElementById('welcome-screen');
    const workspace = document.getElementById('workspace');
    const canvas = document.getElementById('dsgn-canvas');
    const ctx = canvas.getContext('2d');
    const importFileInput = document.getElementById('import-file');
    const maximizeCanvasButton = document.getElementById('maximize-canvas');
    const minimizeCanvasButton = document.getElementById('minimize-canvas');

    let currentTool = 'brush';
    let isDrawing = false;
    let startX, startY;
    let zoomLevel = 1;
    let brushColor = '#000000';
    let textColor = '#000000';
    let shapeColor = '#000000';
    let brushSize = 5;
    let brushOpacity = 1;
    let textSize = 20;
    let shapeSize = 50;
    let layers = [{ id: 0, name: 'Background Layer', canvas: canvas }];
    let currentLayer = layers[0];
    let undoStack = [];
    let redoStack = [];

    function resizeCanvas() {
        canvas.width = workspace.clientWidth - 300; // Sesuaikan dengan toolbar
        canvas.height = workspace.clientHeight - 50; // Sesuaikan dengan footer
        // Update semua layer agar sesuai dengan ukuran baru
        layers.forEach(layer => {
            layer.canvas.width = canvas.width;
            layer.canvas.height = canvas.height;
        });
        // Jika diperlukan, ulangi penggambaran di sini untuk mempertahankan konten yang ada
    }

    function updateBrushColor() {
        brushColor = document.getElementById('brush-color').value;
    }

    function updateTextColor() {
        textColor = document.getElementById('text-color').value;
    }

    function updateShapeColor() {
        shapeColor = document.getElementById('shape-color').value;
    }

    function updateBrushSize() {
        brushSize = document.getElementById('brush-size').value;
    }

    function updateBrushOpacity() {
        brushOpacity = document.getElementById('brush-opacity').value / 100;
    }

    function updateTextSize() {
        textSize = document.getElementById('text-size').value;
    }

    function updateShapeSize() {
        shapeSize = document.getElementById('shape-size').value;
    }

    document.getElementById('brush-tool').addEventListener('click', () => {
        currentTool = 'brush';
    });

    document.getElementById('eraser-tool').addEventListener('click', () => {
        currentTool = 'eraser';
    });

    document.getElementById('move-tool').addEventListener('click', () => {
        currentTool = 'move';
    });

    document.getElementById('shape-tool').addEventListener('click', () => {
        currentTool = 'shape';
    });

    document.getElementById('text-tool').addEventListener('click', () => {
        currentTool = 'text';
    });

    document.getElementById('import-tool').addEventListener('click', () => {
        importFileInput.click();
    });

    importFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('export-tool').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'drawing.png';
        link.click();
    });

    document.getElementById('brush-size').addEventListener('input', updateBrushSize);
    document.getElementById('brush-opacity').addEventListener('input', updateBrushOpacity);
    document.getElementById('text-size').addEventListener('input', updateTextSize);
    document.getElementById('shape-size').addEventListener('input', updateShapeSize);
    document.getElementById('brush-color').addEventListener('input', updateBrushColor);
    document.getElementById('text-color').addEventListener('input', updateTextColor);
    document.getElementById('shape-color').addEventListener('input', updateShapeColor);

    maximizeCanvasButton.addEventListener('click', () => {
        workspace.classList.add('maximized');
        workspace.classList.remove('minimized');
        resizeCanvas();
    });

    minimizeCanvasButton.addEventListener('click', () => {
        workspace.classList.add('minimized');
        workspace.classList.remove('maximized');
        resizeCanvas();
    });

    function drawOnCanvas(e) {
        if (isDrawing) {
            if (currentTool === 'brush' || currentTool === 'eraser') {
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.strokeStyle = currentTool === 'brush' ? brushColor : '#ffffff';
                ctx.lineWidth = brushSize;
                ctx.globalAlpha = currentTool === 'brush' ? brushOpacity : 1;
                ctx.stroke();
            } else if (currentTool === 'text') {
                ctx.font = `${textSize}px Arial`;
                ctx.fillStyle = textColor;
                ctx.fillText('Sample Text', e.offsetX, e.offsetY);
            } else if (currentTool === 'shape') {
                ctx.fillStyle = shapeColor;
                ctx.fillRect(e.offsetX - shapeSize / 2, e.offsetY - shapeSize / 2, shapeSize, shapeSize);
            }
        }
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        startX = e.offsetX;
        startY = e.offsetY;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        undoStack.push(canvas.toDataURL());
        redoStack.length = 0;
    });

    canvas.addEventListener('mousemove', drawOnCanvas);

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        ctx.closePath();
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
        ctx.closePath();
    });

    document.getElementById('undo-button').addEventListener('click', () => {
        if (undoStack.length > 0) {
            redoStack.push(canvas.toDataURL());
            const dataURL = undoStack.pop();
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                document.getElementById('undo-counter').textContent = undoStack.length;
                document.getElementById('redo-counter').textContent = redoStack.length;
            };
            img.src = dataURL;
        }
    });

    document.getElementById('redo-button').addEventListener('click', () => {
        if (redoStack.length > 0) {
            undoStack.push(canvas.toDataURL());
            const dataURL = redoStack.pop();
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                document.getElementById('undo-counter').textContent = undoStack.length;
                document.getElementById('redo-counter').textContent = redoStack.length;
            };
            img.src = dataURL;
        }
    });

    document.getElementById('zoom-in-button').addEventListener('click', () => {
        zoomLevel *= 1.1;
        canvas.style.transform = `scale(${zoomLevel})`;
        document.getElementById('zoom-percentage').textContent = `${Math.round(zoomLevel * 100)}%`;
    });

    document.getElementById('zoom-out-button').addEventListener('click', () => {
        zoomLevel /= 1.1;
        canvas.style.transform = `scale(${zoomLevel})`;
        document.getElementById('zoom-percentage').textContent = `${Math.round(zoomLevel * 100)}%`;
    });

    function addLayer() {
        const newLayer = document.createElement('li');
        const newLayerId = layers.length;
        newLayer.textContent = `Layer ${newLayerId}`;
        newLayer.classList.add('layer-item');
        newLayer.dataset.layerId = newLayerId;
        newLayer.addEventListener('click', () => {
            currentLayer = layers[newLayerId];
        });
        document.getElementById('layer-stack').appendChild(newLayer);
        layers.push({ id: newLayerId, name: `Layer ${newLayerId}`, canvas: document.createElement('canvas') });
        layers[newLayerId].canvas.width = canvas.width;
        layers[newLayerId].canvas.height = canvas.height;
        resizeCanvas();
    }

    document.getElementById('add-layer-button').addEventListener('click', addLayer);

    document.getElementById('start-button').addEventListener('click', () => {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('workspace').classList.remove('hidden');
    });

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
});
