import { TelegramAPI } from "./telegramApi";
import * as TelegramTypes from './types'

export class Telegram extends TelegramAPI {

    sendMessage(chat_id: number, text: string, reply_markup: TelegramTypes.ReplyMarkup | TelegramTypes.EMPTY = {} as TelegramTypes.EMPTY): Promise<TelegramTypes.Message> {
        return super.sendRequest<TelegramTypes.Message>('sendMessage', { chat_id, text, ...reply_markup });
    }

    getMe(options: Object): Promise<TelegramTypes.User> {
        return super.sendRequest<TelegramTypes.User>('getMe', options);
    }

    onText(regexp: RegExp | string, callback: (arg: TelegramTypes.Message) => void): void {
        this.callBacksText.push({ regexp, callback });
    }
}

export * as TelegramTypes from './types'