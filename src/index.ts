import { EventEmitter } from 'node:events';
import { EMPTY, Message, ReplyMarkup, Update } from './types/telegramTypes';
import { TelegramAPI } from './interface/telegramAPI';
import { TelegramPolling } from './telegramPolling';
import { TelegramRequest } from './telegramRequest';

const _messageTypes = [
    'text',
    'animation',
    'audio',
    'channel_chat_created',
    'contact',
    'delete_chat_photo',
    'dice',
    'document',
    'game',
    'group_chat_created',
    'invoice',
    'left_chat_member',
    'location',
    'migrate_from_chat_id',
    'migrate_to_chat_id',
    'new_chat_members',
    'new_chat_photo',
    'new_chat_title',
    'passport_data',
    'photo',
    'pinned_message',
    'poll',
    'sticker',
    'successful_payment',
    'supergroup_chat_created',
    'video',
    'video_note',
    'voice',
    'video_chat_started',
    'video_chat_ended',
    'video_chat_participants_invited',
    'video_chat_scheduled',
    'message_auto_delete_timer_changed',
    'chat_invite_link',
    'chat_member_updated',
    'web_app_data',
];

const updateSimpleTypes = {
    channel_post: 'channel_post',
    inline_query: 'inline_query',
    chosen_inline_result: 'chosen_inline_result',
    callback_query: 'callback_query',
    shipping_query: 'shipping_query',
    pre_checkout_query: 'pre_checkout_query',
    poll: 'poll',
    poll_answer: 'poll_answer',
    chat_member: 'chat_member',
    my_chat_member: 'my_chat_member',
    chat_join_request: 'chat_join_request'
};

export class Telegram extends EventEmitter implements TelegramAPI {
    telegramUpdates: TelegramPolling;
    callBacksText: Array<{ regexp: RegExp | string, callback: (...args: any[]) => void }> = [];
    replyToMessages: Array<{
        id: number,
        chatId: number,
        message_id: number,
        callback: (...args: any[]) => void
    }> = [];

    static get messageTypes() {
        return _messageTypes;
    }

    constructor(telegramToken: string, telegramApi: string | null) {
        super();
        if(telegramApi){
            TelegramRequest.setTelegramApi(telegramApi);
        }
        TelegramRequest.setTelegramToken(telegramToken);
        this.telegramUpdates = new TelegramPolling(this);
        this.startUpdaters();
    }

    startUpdaters(): void {
        return this.telegramUpdates.start();
    }

    processUpdate(update: Update): void {
        const message = update.message;
        if (message) {
            const metadataType = Telegram.messageTypes.find((messageType) => {
                return message[messageType as keyof Message] !== undefined;
            });
            this.emit('message', message, metadataType);
            if (metadataType) {
                this.emit(metadataType, message, {});
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

            if (message.reply_to_message) {
                this.replyToMessages.forEach(reply => {
                    if (reply.chatId === message.chat?.id) {
                        if (reply.message_id === message.reply_to_message?.message_id) {
                            reply.callback(message);
                        }
                    }
                });
            }
        } else {
            for (const [updateKey, eventName] of Object.entries(updateSimpleTypes)) {
                const updateKeyOf = updateKey as keyof Update;
                if (update[updateKeyOf]) {
                    const updateValue = update[updateKeyOf];
                    if (updateValue !== undefined) {
                        this.emit(eventName, update[updateKeyOf]);
                    }
                    break;
                }
            }
        }

    }

    sendMessage(chat_id: number, text: string, reply_markup: ReplyMarkup | EMPTY = {} as EMPTY): void {
        TelegramRequest.sendRequest('sendMessage', { chat_id, text, ...reply_markup });
    }

    getUpdates(options: Object): Promise<Update[]> {
        return TelegramRequest.sendRequest('getUpdates', options);
    }

    getMe(options: Object): Promise<Update[]> {
        return TelegramRequest.sendRequest('getMe', options);
    }

    onText(regexp: RegExp | string, callback: (...args: any[]) => void): void {
        this.callBacksText.push({ regexp, callback });
    }

}
