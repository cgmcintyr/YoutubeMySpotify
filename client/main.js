require('./run-client-server')

const { app, BrowserWindow, screen } = require('electron')


function createWindow() {
  // Create the browser window.
  // BrowserWindow.addExtension('./Extensions/cjpalhdlnbpafiamejdnhcphjbkeiagm/1.24.4_0');
  const primaryDisplay = screen.getPrimaryDisplay();

  const { width, height } = primaryDisplay.bounds

  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    height,
    width,
    backgroundColor: '#222'
  })

  // win.webContents.openDevTools() //remove for prod
  win.setPosition(0, 0);

  // win.setFullScreen(true);
  // win.setAlwaysOnTop(true);
  // win.setAlwaysOnTop(false);
  win.removeMenu()
  win.loadURL('http://localhost:3000/login')

  const { session } = require('electron')

  
  const myFilters = ['doubleclick', 'pagead', 'js/bg', 'annotations_invideo', 'get_midroll_info', 'ptracking']
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    let shouldBlock = myFilters.some(myFilter => {
      return details.url.includes(myFilter);
    })
    
    if (shouldBlock){
      return
    }

    callback({ requestHeaders: details.requestHeaders })
  })
}



app.whenReady().then(createWindow)