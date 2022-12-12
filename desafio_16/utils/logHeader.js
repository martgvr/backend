import fs from 'fs'

async function writeHeader(logFile) {
    const logPath = process.cwd() + logFile;
    const today = new Date(Date.now());
    const logHeader = `--------------------------------------------\n| Inicio de log\n| Sesión: ${today.toUTCString()}\n--------------------------------------------\n\n`
    
    try {
        const fileRead = await fs.promises.readFile(logPath, 'utf-8');
        const fileWrite = await fs.promises.writeFile(logPath, fileRead + (fileRead == '' ? logHeader : '\n' + logHeader));
    } catch (e) { console.log('Error! Algo salió mal') }
}

const logsFile = ['/error.log', '/warn.log']

logsFile.forEach(logFile => writeHeader(logFile))