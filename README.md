# CodeCast-Duo Telegram Bot API

## Content

0. [Introduction](#Introduction)
1. [Installation](#Installation)
2. [API Methods](#API-Methods)
    1. [onMessage Method](#onMessage-Method)
    2. [onUpdate Method](#onUpdate-Method)
    3. [onText Method](#onText-Method)
3. [Event Types](#Event-Types)
    1. [Message Types Table](#Message-Types-Table)
    2. [Update Types Table](#Update-Types-Table)
4. [Examples](#Examples)
5. [~~*__Advanced Topics__*~~](#Advanced-Topics)
    1. [~~*__Custom configurations__*~~](#Custom-configurations)
    2. [~~*__Error handling__*~~](#Error-handling)

## Introduction
Welcome to the CodeCast-Duo Telegram Bot API, an advanced and sophisticated toolset exclusively developed for the CodeCast-Duo organization. This API embodies a comprehensive suite of functionalities, meticulously crafted to cater to the specific requirements of our organizational framework. It is a pivotal asset in streamlining Telegram bot development and management, ensuring that our bots align seamlessly with the operational and strategic objectives of CodeCast-Duo. This documentation serves as a detailed guide, assisting our developers in harnessing the full potential of this bespoke API.

## Installation

To install the package, simply run the following command in your project directory:

```bash
npm i @codecast-duo/codecast-duo-telegrambot
```

This command installs the CodeCast-Duo Telegram Bot package, adding it to your project's dependencies.

## API Methods

The `onMessag`, `onUpdate` and `onText` are key methods used in the CodeCast-Duo Telegram Bot API for handling various types of events:

### onMessage Method

- `onMessage<K extends TelegramTypes.MessageTypesKeys>(event: K, listener: (arg: TelegramTypes.Message[K], message: TelegramTypes.Message) => void)`: This method is used to listen for message-related events. It takes an event type and a listener function as arguments. The event type is one of the keys from `TelegramTypes.MessageTypesKeys`, and the listener function receives the specific message type and the general message object.

### onUpdate Method

- `onUpdate<K extends TelegramTypes.UpdateTypesKeys>(event: K, listener: (arg: TelegramTypes.Update[K], update: TelegramTypes.Update) => void)`: Similar to `onMessage`, this method listens for update-related events. It takes an event type from `TelegramTypes.UpdateTypesKeys` and a listener function. The listener function is invoked with the specific update type and the general update object.

### onText Method

- `onText(regexp: RegExp | string, callback: (arg: TelegramTypes.Message) => void)`: This method is designed to detect and respond to specific text patterns in messages. It takes two parameters:

| Parameter | Description |
| --- | --- |
| `regexp` | A `RegExp` or string pattern that the incoming text message must match. |
| `callback` | A function that is called when a message matching the `regexp` is received. This function takes a `TelegramTypes.Message` object as its argument, providing details about the matched message. |

## Event Types

### Message Types Table

| Event | Description | Return Type |
|----------------|:---------:|----------------|
| `text` | Handles text messages sent in the chat. | `string` |
| `animation` | Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound). | `TelegramTypes.Animation` |
| `audio` | Represents an audio file to be treated as music. | `TelegramTypes.Audio` |
| `channel_chat_created` | Indicates if a channel chat was created. | `boolean` |
| `contact` | Represents a phone contact. | `TelegramTypes.Contact` |
| `delete_chat_photo` | Indicates if a chat photo was deleted. | `boolean` |
| `dice` | Represents an animated emoji that displays a random value. | `TelegramTypes.Dice` |
| `document` | Represents a general file (as opposed to photos, voice messages, and audio files). | `TelegramTypes.Document` |
| `game` | Describes a game within the Telegram platform. | `TelegramTypes.Game` |
| `group_chat_created` | Indicates if a group chat was created. | `boolean` |
| `invoice` | Represents an invoice for a payment. | `TelegramTypes.Invoice` |
| `left_chat_member` | Represents a user who left the chat. | `TelegramTypes.User` |
| `location` | Represents a point on the map. | `TelegramTypes.Location` |
| `migrate_from_chat_id` | Indicates the chat ID from which a chat was migrated. | `number` |
| `migrate_to_chat_id` | Indicates the new chat ID to which a chat was migrated. | `number` |
| `new_chat_members` | Indicates new members added to the chat. | `TelegramTypes.User[]` |
| `new_chat_photo` | Represents a new chat photo update. | `TelegramTypes.PhotoSize[]` |
| `new_chat_title` | Reflects an update to the chat's title. | `string` |
| `passport_data` | Contains information for Telegram Passport data. | `TelegramTypes.PassportData` |
| `photo` | Refers to photo messages. | `TelegramTypes.PhotoSize[]` |
| `pinned_message` | Indicates a message that has been pinned in the chat. | `TelegramTypes.Message` |
| `poll` | Contains information about a poll. | `TelegramTypes.Poll` |
| `sticker` | Represents a sticker sent in the chat. | `TelegramTypes.Sticker` |
| `successful_payment` | Indicates a successful payment transaction. | `TelegramTypes.SuccessfulPayment` |
| `supergroup_chat_created` | Indicates if a supergroup chat was created. | `boolean` |
| `video` | Represents a video file. | `TelegramTypes.Video` |
| `video_note` | Represents a video message. | `TelegramTypes.VideoNote` |
| `voice` | Represents a voice note. | `TelegramTypes.Voice` |
| `video_chat_ended` | Indicates that a video chat in the chat has ended. | `TelegramTypes.VideoChatEnded` |
| `video_chat_participants_invited` | Informs about new members invited to a video chat. | `TelegramTypes.VideoChatParticipantsInvited` |
| `video_chat_scheduled` | Represents a service message about a video chat scheduled in the chat. | `TelegramTypes.VideoChatScheduled` |
| `message_auto_delete_timer_changed` | Notifies about a change in auto-delete timer settings in a chat. | `TelegramTypes.MessageAutoDeleteTimerChanged` |
| `web_app_data` | Describes data sent from a Web App to the bot. | `TelegramTypes.WebAppData` |

### Update Types Table

| Event | Description | Return Type |
|----------------|:---------:|----------------|
| `channel_post` | New incoming channel post of any kind (text, photo, sticker, etc.). | `TelegramTypes.Message` |
| `poll` | New poll state. Bots receive only updates about stopped polls and polls sent by the bot. | `TelegramTypes.Poll` |

## Examples

Here's a basic guide on how to use the CodeCast-Duo Telegram Bot API in your project:

```javascript
const TelegramBot = require('@codecast-duo/codecast-duo-telegrambot');
const token = 'TELEGRAM_TOKEN';
const bot = new Telegram(token, null);

// Listen and send the 'text' parameter from the Message class
bot.onMessage('text', (parameter, message) => {
    console.log(parameter);
});

bot.onText(/\/echo (.+)/, (message, match) => {
  // Send the corresponding 'whatever' to the chat
  bot.sendMessage(message.chat.id, match);
});
```