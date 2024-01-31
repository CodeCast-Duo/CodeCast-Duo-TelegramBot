import * as TelegramTypes from './telegramTypes'

export type MessageTypes = {
    text: string;
    animation: TelegramTypes.Animation;
    audio: TelegramTypes.Audio;
    channel_chat_created: boolean;
    contact: TelegramTypes.Contact;
    delete_chat_photo: boolean;
    dice: TelegramTypes.Dice;
    document: TelegramTypes.Document;
    game: TelegramTypes.Game;
    group_chat_created: boolean;
    invoice: TelegramTypes.Invoice;
    left_chat_member: TelegramTypes.User;
    location: TelegramTypes.Location;
    migrate_from_chat_id: number;
    migrate_to_chat_id: number;
    new_chat_members: TelegramTypes.User[];
    new_chat_photo: TelegramTypes.PhotoSize[];
    new_chat_title: string;
    passport_data: TelegramTypes.PassportData;
    photo: TelegramTypes.PhotoSize[];
    pinned_message: TelegramTypes.Message;
    poll: TelegramTypes.Poll;
    sticker: TelegramTypes.Sticker;
    successful_payment: TelegramTypes.SuccessfulPayment;
    supergroup_chat_created: boolean;
    video: TelegramTypes.Video;
    video_note: TelegramTypes.VideoNote;
    voice: TelegramTypes.Voice;
    //video_chat_started: TelegramTypes.VideoChatStarted;
    video_chat_ended: TelegramTypes.VideoChatEnded;
    video_chat_participants_invited: TelegramTypes.VideoChatParticipantsInvited;
    video_chat_scheduled: TelegramTypes.VideoChatScheduled;
    message_auto_delete_timer_changed: TelegramTypes.MessageAutoDeleteTimerChanged;
    web_app_data: TelegramTypes.WebAppData;
};

export type MessageTypesKeys = keyof MessageTypes;

export const messageTypesKeys: Array<keyof MessageTypes> = [
    "text",
    "animation",
    "audio",
    "channel_chat_created",
    "contact",
    "delete_chat_photo",
    "dice",
    "document",
    "game",
    "group_chat_created",
    "invoice",
    "left_chat_member",
    "location",
    "migrate_from_chat_id",
    "migrate_to_chat_id",
    "new_chat_members",
    "new_chat_photo",
    "new_chat_title",
    "passport_data",
    "photo",
    "pinned_message",
    "poll",
    "sticker",
    "successful_payment",
    "supergroup_chat_created",
    "video",
    "video_note",
    "voice",
    //"video_chat_started", // Uncomment if needed
    "video_chat_ended",
    "video_chat_participants_invited",
    "video_chat_scheduled",
    "message_auto_delete_timer_changed",
    "web_app_data"
];

export type UpdateTypes = {
    channel_post: TelegramTypes.Message,
    //inline_query:InlineQuery,
    //chosen_inline_result:ChosenInlineResult
    callback_query:TelegramTypes.CallbackQuery,
    //shipping_query:ShippingQuery
    //pre_checkout_query:PreCheckoutQuery,
    poll: TelegramTypes.Poll
    //poll_answer:PollAnswer
    //chat_member:	ChatMemberUpdated
    //my_chat_member:ChatMemberUpdated
    //chat_join_request:ChatJoinRequest
}

export type UpdateTypesKeys = keyof UpdateTypes;

export const updateTypesKeys: Array<keyof UpdateTypes> = [
    "channel_post",
    "poll",
    "callback_query"
]
