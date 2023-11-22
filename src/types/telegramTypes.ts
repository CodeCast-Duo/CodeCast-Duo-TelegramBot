export type User = {
  id: number,
  is_bot: boolean,
  first_name: string,
  last_name?: string,
  language_code?: string,
  is_premium?: boolean,
  added_to_attachment_menu?: boolean,
  can_join_groups?: boolean,
  can_read_all_group_messages?: boolean,
  supports_inline_queries?: boolean,
}

export type Message = {
  message_id: number,
  message_thread_id?: number,
  from?: User,
  date: number,
  chat: Chat,
  forward_from?: User,
  forward_date?: number,
  reply_to_message?: Message,
  text?: string,
}

export type Chat = {
  id: number,
  type: string,
  title?: string,
  username?: string,
  first_name?: string,
  last_name?: string,
  all_members_are_administrators?: boolean
}

export type Update = {
  update_id: number,
  message?: Message,
  edited_message?: Message,
  channel_post?: Message,
  edited_channel_post?: Message,
  //inline_query
}

export type InlineKeyboardMarkup = {
  inline_keyboard: Array<InlineKeyboardButton[]>
}

export type InlineKeyboardButton = {
  text: string,
  url?: string,
  callback_data?: string,
  //web_app?:WebAppInfo,
  //login_url?:LoginUrl,

}

export type ReplyKeyboardMarkup = {
  keyboard: KeyboardButton[],
  resize_keyboard?: boolean,
  one_time_keyboard?: boolean,
  selective?: boolean
}

export type ReplyKeyboardRemove = {
  remove_keyboard: true,
  selective?: boolean
}

export type ForceReply = {
  force_reply: true,
  input_field_placeholder?: string,
  selective?: boolean
}

export type KeyboardButton = {
  text: string,
  request_contact: boolean,
  request_location: boolean
}

export type ReplyMarkup = {
  reply_markup: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply
}

export interface EMPTY { }