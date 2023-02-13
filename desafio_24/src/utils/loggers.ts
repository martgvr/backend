import * as colorlog from "https://deno.land/x/colorlog@v1.0/mod.ts"

export default class Logger {
    error = (message: string) => colorlog.errorLog(message)
    success = (message: string) => colorlog.successLog(message)
    warning = (message: string) => colorlog.warningLog(message)
}

export const logger = new Logger()