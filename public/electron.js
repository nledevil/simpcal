import { app } from 'electron';
import TrayWindow from 'electron-tray-window';
import debug from 'electron-debug';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

debug({
  isEnabled:true,
  showDevTools: true,
  devToolsMode: 'undocked',
});

const isDev = () => {
  const {env} = process;

  const isEnvSet = 'ELECTRON_IS_DEV' in env;
  const getFromEnv = Number.parseInt(env.ELECTRON_IS_DEV, 10) === 1;
  return isEnvSet ? getFromEnv : !app.isPackaged;
}

/* require("update-electron-app")({
  repo: "kitze/react-electron-example",
  updateInterval: "1 hour"
}); */

app.whenReady().then(() => {
  const timeout = 10;
  
  const startURL = isDev()
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  
  const trayIconPath = isDev()
    ? path.join(__dirname, 'resources/simpcalTemplate.png')
    : path.join(__dirname, '../build/resources/simpcalTemplate.png');

  setTimeout(function () {
    TrayWindow.setOptions({
      trayIconPath: trayIconPath,
      windowUrl: startURL,
      width: 340,
      height: 820,
    });
  }, timeout);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})