const dropZone = document.querySelector('.drop-zone');

const handleDragover = (e)=>{
    e.preventDefault();
    e.stopPropagation();
}

const handleDrop = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    const filePath = api.showFilePath(file);
    api.handleDoc(filePath);
}

dropZone.addEventListener('dragover', handleDragover);
dropZone.addEventListener('drop', handleDrop);
