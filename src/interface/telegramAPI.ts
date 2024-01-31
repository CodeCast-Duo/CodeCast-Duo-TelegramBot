import * as TelegramTypes from '../types'

export interface ITelegramAPI {
    getUpdates(options: Object): Promise<TelegramTypes.Update[]>;
    processUpdate(update: TelegramTypes.Update): void;
    startUpdater(): void;
    stoptUpdater(): void;
    on(eventName: string | symbol, listener: (...args: any[]) => void): this;
    sendRequest<T>(path: string, options: Object): Promise<T>;
}