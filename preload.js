const { contextBridge, ipcRenderer, webUtils } = require('electron');

const api = {
    handleDoc: async (file) => ipcRenderer.invoke('handle-doc', file),
    showFilePath: (file) => {
        const path = webUtils.getPathForFile(file);
        return path;
    }
}

contextBridge.exposeInMainWorld('api', api);
