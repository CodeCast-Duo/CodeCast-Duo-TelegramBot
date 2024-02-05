import { InlineKeyboardMarkup, LinkPreviewOptions, MessageEntity } from "./telegramTypes";


// EditMessageTextType
type BaseMessage = {
    text: string,
    parse_mode?: string,
    entities?: Array<MessageEntity>,
    link_preview_options?: LinkPreviewOptions,
    reply_markup?: InlineKeyboardMarkup,
};

export type EditMessageWithChatId = BaseMessage & {
    chat_id: number,
    message_id: number,
    inline_message_id?: never,
};

export type EditMessageWithInlineId = BaseMessage & {
    chat_id?: never,
    message_id?: never,
    inline_message_id: string,
};

export type EditMessageTextType = EditMessageWithChatId | EditMessageWithInlineId;