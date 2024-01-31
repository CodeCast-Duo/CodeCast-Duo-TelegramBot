import * as util from 'node:util';

interface ILogger {
    info(format: string, ...params: any[]): void;
    debug(format: string, ...params: any[]): void;
}

class Logger implements ILogger {
    private logLevel: 'info' | 'debug';

    constructor(logLevel: 'info' | 'debug') {
        this.logLevel = logLevel;
    }

    info(format: string, ...params: any[]): void {
        if (this.logLevel === 'info') {
            console.log(`INFO: ${new Date().toISOString()} - ${util.format(format, ...params)}`);
        }
    }

    debug(format: string, ...params: any[]): void {
        if (this.logLevel === 'debug') {
            console.log(`DEBUG: ${new Date().toISOString()} - ${util.format(format, ...params)}`);
        }
    }
}

export default Logger;
