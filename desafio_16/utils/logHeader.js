import fs from 'fs'

const logPath = process.cwd() + "/logs.log";
const today = new Date(Date.now());
const logHeader = `--------------------------------------------\n| Inicio de log\n| Sesión: ${today.toUTCString()}\n--------------------------------------------\n\n`

try {
    const fileRead = await fs.promises.readFile(logPath, 'utf-8');
    const fileWrite = await fs.promises.writeFile(logPath, fileRead + (fileRead == '' ? logHeader : '\n' + logHeader));
} catch (e) { console.log('Error! Algo salió mal') }