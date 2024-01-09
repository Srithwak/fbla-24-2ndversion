const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

const createWindow = () => {
   const win = new BrowserWindow({
      width: 1920,
      height: 1080,
      minWidth: 1920,
      minHeight: 1080,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false
      },
      title: 'Placeholder'
   });
   if (isDev) win.webContents.openDevTools();
   win.loadFile(path.join(__dirname, './assets/login.html'));
   // win.loadFile(path.join(__dirname, './assets/signUp.html'));
}

app.whenReady().then(() => {
   createWindow();
   app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (!isMac) app.quit(); });