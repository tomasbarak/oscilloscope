const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: (filename) => ipcRenderer.invoke('getWaveformJson', filename)
})