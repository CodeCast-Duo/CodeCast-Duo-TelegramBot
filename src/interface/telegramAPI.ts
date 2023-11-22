import { Update } from "../types/telegramTypes";

export interface TelegramAPI {
    sendMessage(chatId: number, text: string): void;
    getUpdates(options: Object): Promise<Update[]>;
    getMe(options: Object): Promise<Update[]>;
    onText(regexp: RegExp | string, callback: (...args: any[]) => void): void;
    processUpdate(update: Update): void;
    startUpdaters(): void;
    on(eventName: string | symbol, listener: (...args: any[]) => void): this;
}