const { app, BrowserWindow, ipcMain } = require('electron')
const publicDir = require('path').join(__dirname, 'public')
const path = require('path')
const fs = require('fs')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js") // use a preload script,
          }
    })

    function readFile(){
        const file = fs.readFileSync(`${publicDir}/sunrays.json`);
        const data = JSON.parse(file);
        return data;
    }

    ipcMain.handle("getWaveformJson", readFile);

    win.loadFile(`${publicDir}/app.html`)
}

app.whenReady().then(() => {
    createWindow();
})

