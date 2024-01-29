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

export type Chat = {
  id: number,
  type: string,
  title?: string,
  username?: string,
  first_name?: string,
  last_name?: string,
  all_members_are_administrators?: boolean
}

export type Message = {
  message_id: number, // Unique message identifier inside this chat
  message_thread_id?: number, // Identifier of a message thread (for supergroups only)
  from?: User, // Sender of the message; empty for messages sent to channels
  sender_chat?: Chat, // Sender of the message, sent on behalf of a chat
  date: number, // Date the message was sent in Unix time
  chat: Chat, // Conversation the message belongs to
  forward_from?: User, // For forwarded messages, sender of the original message
  forward_from_chat?: Chat, // For messages forwarded from channels, information about the original sender chat
  forward_from_message_id?: number, // Identifier of the original message in the channel
  forward_signature?: string, // Signature of the message sender for forwarded messages from channels
  forward_sender_name?: string, // Sender's name for forwarded messages from users disallowing account linking
  forward_date?: number, // Date the original message was sent in Unix time
  is_topic_message?: boolean, // True if the message is sent to a forum topic
  is_automatic_forward?: boolean, // True if the message is automatically forwarded to a connected group
  reply_to_message?: Message, // The original message for replies
  via_bot?: User, // Bot through which the message was sent
  edit_date?: number, // Date the message was last edited in Unix time
  has_protected_content?: boolean, // True if the message can't be forwarded
  media_group_id?: string, // Identifier of a media message group this message belongs to
  author_signature?: string, // Signature of the post author for messages in channels
  text?: string, // Actual UTF-8 text of the message, for text messages
  entities?: MessageEntity[], // Special entities like usernames, URLs, etc., in the text
  animation?: Animation, // Information about the animation, for messages containing animations
  audio?: Audio, // Information about the audio file, for messages containing audio
  document?: Document, // Information about the file, for messages containing general files
  photo?: PhotoSize[], // Available sizes of the photo, for messages containing photos
  sticker?: Sticker, // Information about the sticker, for messages containing stickers
  //story?: Story, // Information about the forwarded story, for messages containing stories
  video?: Video, // Information about the video, for messages containing videos
  video_note?: VideoNote, // Information about the video note, for messages containing video notes
  voice?: Voice, // Information about the voice message, for messages containing voice messages
  caption?: string, // Caption for media content (animation, audio, document, photo, video, or voice)
  caption_entities?: MessageEntity[], // Entities in the media caption
  has_media_spoiler?: boolean, // True if the media in the message is covered by a spoiler animation
  contact?: Contact, // Information about the contact, for messages containing contacts
  dice?: Dice, // Information about the dice roll, for messages containing a dice roll
  game?: Game, // Information about the game, for messages containing games
  poll?: Poll, // Information about the poll, for messages containing polls
  venue?: Venue, // Information about the venue, for messages containing venue information
  location?: Location, // Information about the location, for messages containing location information
  new_chat_members?: User[], // Information about new members added to the group or supergroup
  left_chat_member?: User, // Information about a member removed from the group
  new_chat_title?: string, // New chat title if it was changed
  new_chat_photo?: PhotoSize[], // New chat photo if it was changed
  delete_chat_photo?: boolean, // True if the chat photo was deleted
  group_chat_created?: boolean, // True if the group has been created
  supergroup_chat_created?: boolean, // True if the supergroup has been created
  channel_chat_created?: boolean, // True if the channel has been created
  message_auto_delete_timer_changed?: MessageAutoDeleteTimerChanged, // Service message about auto-delete timer settings changed in the chat
  migrate_to_chat_id?: number, // Identifier for a group migrated to a supergroup
  migrate_from_chat_id?: number, // Identifier for a supergroup migrated from a group
  pinned_message?: Message, // Information about a pinned message
  invoice?: Invoice, // Information about an invoice for a payment
  successful_payment?: SuccessfulPayment, // Information about a successful payment
  user_shared?: UserShared, // Service message about a user shared with the bot
  chat_shared?: ChatShared, // Service message about a chat shared with the bot
  connected_website?: string, // Domain name of the website where the user logged in
  write_access_allowed?: WriteAccessAllowed, // Service message about write access granted to the bot
  passport_data?: PassportData, // Telegram Passport data
  proximity_alert_triggered?: ProximityAlertTriggered, // Service message about a user's proximity alert triggered
  forum_topic_created?: ForumTopicCreated, // Service message about forum topic created
  forum_topic_edited?: ForumTopicEdited, // Service message about forum topic edited
  //forum_topic_closed?: ForumTopicClosed, // Service message about forum topic closed
  //forum_topic_reopened?: ForumTopicReopened, // Service message about forum topic reopened
  //general_forum_topic_hidden?: GeneralForumTopicHidden, // Service message about the 'General' forum topic hidden
  //general_forum_topic_unhidden?: GeneralForumTopicUnhidden, // Service message about the 'General' forum topic unhidden
  video_chat_scheduled?: VideoChatScheduled, // Service message about video chat scheduled
  //video_chat_started?: VideoChatStarted, // Service message about video chat started
  video_chat_ended?: VideoChatEnded, // Service message about video chat ended
  video_chat_participants_invited?: VideoChatParticipantsInvited, // Service message about new participants invited to a video chat
  web_app_data?: WebAppData, // Service message about data sent by a Web App
  reply_markup?: InlineKeyboardMarkup, // Inline keyboard attached to the message
};

export type MessageEntity = {
  type: string, // Type of the entity. Can be “mention”, “hashtag”, “cashtag”, “bot_command”, “url”, “email”, “phone_number”, “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, “code”, “pre”, “text_link”, “text_mention”, “custom_emoji”
  offset: number, // Offset in UTF-16 code units to the start of the entity
  length: number, // Length of the entity in UTF-16 code units
  url?: string, // For “text_link” only, URL that will be opened after user taps on the text
  user?: User, // For “text_mention” only, the mentioned user
  language?: string, // For “pre” only, the programming language of the entity text
  custom_emoji_id?: string, // For “custom_emoji” only, unique identifier of the custom emoji
};

export type PhotoSize = {
  file_id: string; // Unique identifier for this file
  file_unique_id: string; // Unique identifier for this file (unique for the chat)
  width: number; // Photo width
  height: number; // Photo height
  file_size?: number; // File size (in bytes)
};

export type Animation = {
  file_id: string; // Unique file identifier
  file_unique_id: string; // Unique identifier for this file
  width: number; // Video width as defined by sender
  height: number; // Video height as defined by sender
  duration: number; // Duration of the video in seconds as defined by sender
  thumb?: PhotoSize; // Animation thumbnail as defined by sender
  file_name?: string; // Original animation filename as defined by sender
  mime_type?: string; // MIME type of the file as defined by sender
  file_size?: number; // File size in bytes as defined by sender
};

export type Audio = {
  file_id: string; // Unique file identifier
  file_unique_id: string; // Unique identifier for this file
  duration: number; // Duration of the audio in seconds as defined by sender
  performer?: string; // Performer of the audio as defined by sender
  title?: string; // Title of the audio as defined by sender
  file_name?: string; // Original filename of the audio as defined by sender
  mime_type?: string; // MIME type of the file as defined by sender
  file_size?: number; // File size in bytes as defined by sender
  thumb?: PhotoSize; // Thumbnail of the album cover to which the audio belongs
};

export type Document = {
  file_id: string; // Unique file identifier
  file_unique_id: string; // Unique identifier for this file
  thumb?: PhotoSize; // Document thumbnail as defined by sender
  file_name?: string; // Original document filename as defined by sender
  mime_type?: string; // MIME type of the file as defined by sender
  file_size?: number; // File size in bytes as defined by sender
};

export type Video = {
  file_id: string; // Unique file identifier
  file_unique_id: string; // Unique identifier for this file
  width: number; // Video width as defined by sender
  height: number; // Video height as defined by sender
  duration: number; // Duration of the video in seconds as defined by sender
  thumb?: PhotoSize; // Video thumbnail as defined by sender
  file_name?: string; // Original video filename as defined by sender
  mime_type?: string; // MIME type of the file as defined by sender
  file_size?: number; // File size in bytes as defined by sender
};

export type VideoNote = {
  file_id: string; // Unique file identifier
  file_unique_id: string; // Unique identifier for this file
  length: number; // Video width and height (diameter of the video message) as defined by sender
  duration: number; // Duration of the video in seconds as defined by sender
  thumb?: PhotoSize; // Video note thumbnail as defined by sender
  file_size?: number; // File size in bytes as defined by sender
};

export type Voice = {
  file_id: string; // Unique file identifier
  file_unique_id: string; // Unique identifier for this file
  duration: number; // Duration of the audio in seconds as defined by sender
  mime_type?: string; // MIME type of the file as defined by sender
  file_size?: number; // File size in bytes as defined by sender
};

export type Contact = {
  phone_number: string; // Contact's phone number
  first_name: string; // Contact's first name
  last_name?: string; // Contact's last name
  user_id?: number; // Contact's user identifier in Telegram
  vcard?: string; // Additional data about the contact in the form of a vCard
};

export type Dice = {
  emoji: string; // Emoji on which the dice throw animation is based
  value: number; // Value of the dice, 1-6 for “🎲” and “🎯” base emoji, 1-5 for “🏀” base emoji
};

export type Game = {
  title: string; // Title of the game
  description: string; // Description of the game
  photo: PhotoSize[]; // Array of game photos
  text?: string; // A brief text about the game
  text_entities?: MessageEntity[]; // Special entities in the text about the game
  animation?: Animation; // Animation that will be displayed in the game message in chats
};

export type Poll = {
  id: string; // Unique poll identifier
  question: string; // Poll question
  options: PollOption[]; // List of poll answer options
  total_voter_count: number; // Total number of users who voted in the poll
  is_closed: boolean; // True if the poll is closed
  is_anonymous: boolean; // True if the poll is anonymous
  type: string; // Poll type ("regular" or "quiz")
  allows_multiple_answers: boolean; // True if the poll allows multiple answers
  correct_option_id?: number; // ID of the correct quiz answer
  explanation?: string; // Explanation for the correct quiz answer
  explanation_entities?: MessageEntity[]; // Special entities in the explanation text
  open_period?: number; // Amount of time in seconds the poll will be active
  close_date?: number; // Point in time when the poll will be automatically closed
};

export type PollOption = {
  text: string; // Text of the poll option
  voter_count: number; // Number of users who voted for this option
};

export type Venue = {
  location: Location; // Venue location coordinates
  title: string; // Name of the venue
  address: string; // Address of the venue
  foursquare_id?: string; // Foursquare identifier of the venue
  foursquare_type?: string; // Foursquare type of the venue
  google_place_id?: string; // Google Places identifier of the venue
  google_place_type?: string; // Google Places type of the venue
};

export type Location = {
  latitude: number; // Latitude of the location
  longitude: number; // Longitude of the location
  //....
};

export type MessageAutoDeleteTimerChanged = {
  message_auto_delete_time: number; // New auto-delete timer setting for the chat, in seconds
};

export type Invoice = {
  title: string; // Title of the product or service
  description: string; // Description of the product or service
  start_parameter: string; // Unique invoice start parameter
  currency: string; // Currency of the invoice (e.g., "USD")
  total_amount: number; // Total price of the product or service in the smallest units of the currency
};

export type SuccessfulPayment = {
  currency: string; // Currency of the payment (e.g., "USD")
  total_amount: number; // Total price of the payment
  invoice_payload: string; // Unique identifier of the invoice related to the payment
  shipping_option_id?: string; // Identifier of the chosen shipping option
  order_info?: OrderInfo; // Additional order details
  telegram_payment_charge_id: string; // Telegram payment identifier
  provider_payment_charge_id: string; // Payment provider identifier
};

export type OrderInfo = {
  name?: string; // User's name
  phone_number?: string; // User's phone number
  email?: string; // User's email address
  shipping_address?: ShippingAddress; // User's shipping address
};

export type ShippingAddress = {
  country_code: string; // ISO 3166-1 alpha-2 country code
  state: string; // State or region name
  city: string; // City name
  street_line1: string; // First line of the street address
  street_line2: string; // Second line of the street address
  post_code: string; // Postal code
};

export type UserShared = {
  request_id: number; // Identifier of the request
  user_id: number; // Identifier of the shared user (may have more than 32 significant bits)
};

export type ChatShared = {
  request_id: number; // Identifier of the request
  chat_id: number; // Identifier of the shared chat (may have more than 32 significant bits)
};

export type WriteAccessAllowed = {
  from_request?: boolean; // True if access was granted after user accepted a request from a Web App.
  web_app_name?: string; // Name of the Web App if access was granted when launched from a link.
  from_attachment_menu?: boolean; // True if access was granted when bot was added to attachment or side menu.
};

export type PassportData = {
  data: EncryptedPassportElement[]; // Encrypted data containing passport information
  credentials: EncryptedCredentials; // Encrypted data credentials
};

export type EncryptedPassportElement = {
  type: string; // Type of the encrypted element (e.g., "personal_details", "passport", "driver_license")
  data?: string; // Base64-encoded encrypted data
  phone_number?: string; // Phone number associated with the element
  email?: string; // Email associated with the element
  files?: PassportFile[]; // Array of attached files (e.g., scans and front/back of documents)
  front_side?: PassportFile; // Front side of the document
  reverse_side?: PassportFile; // Reverse side of the document
  selfie?: PassportFile; // Selfie with the document
  translation?: PassportFile[]; // Array of files with translated versions of documents
  hash: string; // Base64-encoded element hash for data integrity verification
};

export type PassportFile = {
  file_id: string; // Unique identifier for this file
  file_unique_id: string; // Unique identifier for this file, which is unique for the user
  file_size: number; // File size in bytes
  file_date: number; // Unix timestamp when the file was uploaded
};

export type EncryptedCredentials = {
  data: string; // Base64-encoded encrypted data about the user
  hash: string; // Base64-encoded data hash
  secret: string; // Base64-encoded secret for decryption
};

export type ProximityAlertTriggered = {
  traveler: User; // The user identifier of the traveler
  watcher: User; // The user identifier of the watcher
  distance: number; // The distance at which the proximity alert was triggered
};

export type ForumTopicCreated = {
  name: string; // Name of the topic
  icon_color: number; // Color of the topic icon in RGB format
  icon_custom_emoji_id?: string; // Unique identifier of the custom emoji shown as the topic icon
};

export type ForumTopicEdited = {
  name?: string; // New name of the topic, if it was edited
  icon_custom_emoji_id?: string; // New identifier of the custom emoji shown as the topic icon, empty string if removed
};

export type VideoChatScheduled = {
  start_date: number; // Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator
};

export type VideoChatEnded = {
  duration: number; // Video chat duration in seconds
};

export type VideoChatParticipantsInvited = {
  users: User[]; // Array of User objects representing the new members invited to the video chat
};

export type WebAppData = {
  data: string; // The data (can contain arbitrary data)
  button_text: string; // Text of the web_app keyboard button (can contain arbitrary data)
};

export type InlineKeyboardMarkup = {
  inline_keyboard: Array<InlineKeyboardButton[]>
}

export type InlineKeyboardButton = {
  text: string; // Label text on the button
  url?: string; // HTTP or tg:// URL to be opened when the button is pressed
  callback_data?: string; // Data to be sent in a callback query to the bot when the button is pressed (1-64 bytes)
  web_app?: WebAppInfo; // Description of the Web App to be launched when the button is pressed
  login_url?: LoginUrl; // An HTTPS URL used for user authorization
  switch_inline_query?: string; // Insert the bot's username and specified inline query when pressed
  switch_inline_query_current_chat?: string; // Insert the bot's username and inline query in the current chat
  switch_inline_query_chosen_chat?: SwitchInlineQueryChosenChat; // Prompt user to select a chat and insert bot's username and inline query
  //callback_game?: CallbackGame; // Description of the game to be launched when the button is pressed
  pay?: boolean; // Set to true to enable payment functionality
};

export type WebAppInfo = {
  url: string; // An HTTPS URL of a Web App to be opened with additional data
};

export type LoginUrl = {
  url: string; // An HTTPS URL to be opened with user authorization data added to the query string
  forward_text?: string; // New text of the button in forwarded messages
  bot_username?: string; // Username of the bot for user authorization
  request_write_access?: boolean; // Pass True to request permission for your bot to send messages to the user
};

export type SwitchInlineQueryChosenChat = {
  query?: string; // The default inline query to be inserted in the input field
  allow_user_chats?: boolean; // True if private chats with users can be chosen
  allow_bot_chats?: boolean; // True if private chats with bots can be chosen
  allow_group_chats?: boolean; // True if group and supergroup chats can be chosen
  allow_channel_chats?: boolean; // True if channel chats can be chosen
};

export type Update = {
  update_id: number,
  message?: Message,
  edited_message?: Message,
  channel_post?: Message,
  edited_channel_post?: Message,
  poll: Poll,
  callback_query: CallbackQuery,
  chat_join_request: ChatJoinRequest,
}

export type ChatJoinRequest = {
  chat:Chat,
  from:	User,
  user_chat_id: number,
  date: number,
  bio?: string,
  invite_link?: ChatInviteLink
}

export type ChatInviteLink = {
  invite_link: string,
  creator: User,
  creates_join_request: boolean,
  is_primary: boolean,
  is_revoked: boolean,
  name?: string,
  expire_date?: number,
  member_limit?: number,
  pending_join_request_count?: number,
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

export type TelegramErrorResponse = {
  ok: boolean,
  error_code: number,
  description: string
}

export type CallbackQuery = {
  id: string, // Unique identifier for this query.
  from: User, // Sender of the query, as a User object.
  message?: Message, // Message with the callback button that originated the query.
  inline_message_id?: string, // Identifier of the message sent via the bot in inline mode, that originated the query.
  chat_instance: string, // Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent.
  data?: string, // Data associated with the callback button. 
  game_short_name?: string // Short name of a Game to be returned, serves as the unique identifier for the game.
};


export interface EmptyObject { }

export type Sticker = {
  file_id: string; // Unique file identifier
  file_unique_id: string; // Unique identifier for this file
  width: number; // Sticker width
  height: number; // Sticker height
  is_animated: boolean; // True if the sticker is animated
  thumb?: PhotoSize; // Sticker thumbnail as defined by sender
  emoji?: string; // Emoji associated with the sticker
  set_name?: string; // Name of the sticker set to which the sticker belongs
  //mask_position?: MaskPosition; // For mask stickers, the position where the mask should be placed
  file_size?: number; // File size in bytes as defined by sender
};
