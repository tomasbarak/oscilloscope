const { app, BrowserWindow } = require('electron')
const publicDir = require('path').join(__dirname, 'public')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile(`${publicDir}/app.html`)
}

app.whenReady().then(() => {
    createWindow();
})