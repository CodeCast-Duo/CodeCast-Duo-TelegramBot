import { TelegramAPI } from "./telegramApi";
import * as TelegramTypes from './types';

export class Telegram extends TelegramAPI {

    sendMessage(chat_id: number, text: string, reply_markup: TelegramTypes.ReplyMarkup | TelegramTypes.EmptyObject = {} as TelegramTypes.EmptyObject): Promise<TelegramTypes.Message> {
        return super.sendRequest<TelegramTypes.Message>('sendMessage', { chat_id, text, ...reply_markup });
    }

    getMe(options: Object | TelegramTypes.EmptyObject = {}): Promise<TelegramTypes.User> {
        return super.getMe(options);
    }

    onText(regexp: RegExp | string, callback: (arg: TelegramTypes.Message) => void): void {
        this.callBacksText.push({ regexp, callback });
    }

    editMessageText(options: TelegramTypes.EditMessageTextType): Promise<TelegramTypes.Message> {
        if (!options.chat_id && !options.message_id && !options.inline_message_id) {
            throw new Error('Need chat_id, message_id or inline_message_id');
        }
        return super.sendRequest<TelegramTypes.Message>('editMessageText', options);
    }
}

export * as TelegramTypes from './types'
export { TelegramError } from './telegramError'