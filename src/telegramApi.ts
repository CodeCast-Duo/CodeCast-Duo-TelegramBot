import { EventEmitter } from 'node:events';
import { ITelegramAPI } from './interface/telegramAPI';
import { TelegramPolling } from './telegramPolling';
import { TelegramRequest } from './telegramRequest';
import * as TelegramTypes from './types';
import { TelegramError } from './telegramError';
import { TelegramOptions } from './types';
import { PollingWaitManager } from './PollingWaitManager';

export class TelegramAPI extends EventEmitter implements ITelegramAPI {
    telegramPolling: TelegramPolling;
    callBacksText: Array<{ regexp: RegExp | string, callback: (...args: any[]) => void }> = [];
    replyToMessages: Array<{
        id: number,
        chatId: number,
        message_id: number,
        callback: (...args: any[]) => void
    }> = [];

    private _options: TelegramOptions;
    public get options(): TelegramOptions {
        return this._options;
    }

    constructor(options: TelegramOptions) {
        super();
        this._options = { start: true, ...options };
        if (this._options.telegramApi) {
            TelegramRequest.setTelegramApi(this._options.telegramApi);
        }
        TelegramRequest.setTelegramToken(this._options.telegramToken);
        this.telegramPolling = new TelegramPolling(this);
        this.checkConnection();
        if (this._options.start) {
            this.startUpdater();
        }
    }

    getPollingWaitManager(): PollingWaitManager | undefined {
        return this.telegramPolling.pollingWaitManager;
    }

    setPollingWaitManager(name: string, func: () => boolean): void {
        this.telegramPolling.setPollingWaitManager(name, func);
    }

    removePollingWaitManager(name: string): void {
        this.telegramPolling.removePollingWaitManager(name);
    }

    sendError(error: Error) {
        this.emit("error", error);
        if (error instanceof TelegramError && error.type) {
            this.emit("error-" + error.type, error);
        }
    }

    onMessage<K extends TelegramTypes.MessageTypesKeys>(event: K, listener: (arg: TelegramTypes.Message[K], message: TelegramTypes.Message) => void): this {
        return super.on(event, listener);
    }

    emitMessage<K extends TelegramTypes.MessageTypesKeys>(event: K, arg: TelegramTypes.Message[K], message: TelegramTypes.Message): boolean {
        return super.emit(event, arg, message);
    }

    onUpdate<K extends TelegramTypes.UpdateTypesKeys>(event: K, listener: (arg: TelegramTypes.Update[K], update: TelegramTypes.Update) => void): this {
        return super.on(event, listener);
    }

    emitUpdate<K extends TelegramTypes.UpdateTypesKeys>(event: K, arg: TelegramTypes.Update[K], update: TelegramTypes.Update): boolean {
        return super.emit(event, arg, update);
    }

    checkConnection(): void {
        return this.telegramPolling.checkConnection({});
    }

    startUpdater(): void {
        return this.telegramPolling.start();
    }

    stoptUpdater(): void {
        this.telegramPolling.stop();
    }

    isIncludeMessageType<K extends keyof TelegramTypes.MessageTypesKeys>(key: string): K | false {
        if (TelegramTypes.messageTypesKeys.includes(key as TelegramTypes.MessageTypesKeys)) {
            return key as K;
        } else {
            return false;
        }
    }

    isIncludeUpdateType<K extends TelegramTypes.UpdateTypesKeys>(key: string): K | false {
        if (TelegramTypes.updateTypesKeys.includes(key as TelegramTypes.UpdateTypesKeys)) {
            return key as K;
        } else {
            return false;
        }
    }

    processUpdate(update: TelegramTypes.Update): void {
        const message = update.message;
        if (message) {
            const metadataType = Object.keys(message).find(this.isIncludeMessageType) as TelegramTypes.MessageTypesKeys;
            this.emit('message', message, update);
            if (metadataType) {
                this.emitMessage(metadataType, message[metadataType], message);
            }
            if (message.text) {
                const text = message.text.toString();
                this.callBacksText.some(callBack => {
                    if (!(callBack.regexp instanceof RegExp)) {
                        callBack.regexp = new RegExp(callBack.regexp);
                    }
                    const result = callBack.regexp.exec(text);
                    if (!result) {
                        return;
                    }
                    callBack.callback(message, result);
                });
            }
            /*if (message.reply_to_message) {
                this.replyToMessages.forEach(reply => {
                    if (reply.chatId === message.chat?.id) {
                        if (reply.message_id === message.reply_to_message?.message_id) {
                            reply.callback(message);
                        }
                    }
                });
            }*/
        } else {
            for (const [updateKey, updateValue] of Object.entries(update)) {
                const metadataType = this.isIncludeUpdateType(updateKey);
                if (updateValue && metadataType) {
                    this.emitUpdate(updateKey as TelegramTypes.UpdateTypesKeys, update[metadataType], update);
                }
            }
        }
    }

    getMe(options: Object): Promise<TelegramTypes.User> {
        return this.sendRequest<TelegramTypes.User>('getMe', options);
    }

    sendRequest<T>(path: string, options: Object | TelegramTypes.EmptyObject = {}): Promise<T> {
        return TelegramRequest.sendRequest<T>(path, options);
    }

    getUpdates(options: Object): Promise<TelegramTypes.Update[]> {
        return this.sendRequest<TelegramTypes.Update[]>('getUpdates', options);
    }

}
