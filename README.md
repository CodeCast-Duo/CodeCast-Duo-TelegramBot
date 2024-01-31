# CodeCast-Duo Telegram Bot API

## Content

0. [Introduction](#introduction)
1. [Installation](#installation)
2. [Telegram API - Usage Guide](#telegram-api---usage-guide)
    1. [Creating an Instance](#creating-an-instance-of-telegramapi)
    2. [Configuring TelegramOptions](#configuring-telegramoptions)
        1. [TelegramOptions Table](#telegramoptions-table)
        2. [OptionsUpdate Sub-Table](#optionsupdate-sub-table)
        3. [OptionsPollingWaitManage Sub-Table](#optionspollingwaitmanage-sub-table)
3. [API Methods](#api-methods)
    1. [onMessage Method](#onmessage-method)
    2. [onUpdate Method](#onupdate-method)
    3. [onText Method](#ontext-method)
    4. [startUpdater Method](#startupdater-method)
    5. [stopUpdater Method](#stopupdater-method)
4. [Event Types](#event-types)
    1. [Message Types Table](#message-types-table)
    2. [Update Types Table](#update-types-table)
5. [Examples](#examples)
6. [Advanced Topics](#advanced-topics)
    1. [Error types](#error-types)
	2. [Error handling](#error-handling)
	3. [Description TelegramError class](#description-telegramerror)
	    1. [Properties Table TelegramError](#properties-table-telegramerror)
7. [Polling Wait Manager](#polling-wait-manager)
    1. [Using Polling Wait Manager](#using-polling-wait-manager)
    2. [Polling Wait Manager Methods](#polling-wait-manager-methods)

## Introduction
Welcome to the CodeCast-Duo Telegram Bot API, an advanced and sophisticated toolset exclusively developed for the CodeCast-Duo organization. This API embodies a comprehensive suite of functionalities, meticulously crafted to cater to the specific requirements of our organizational framework. It is a pivotal asset in streamlining Telegram bot development and management, ensuring that our bots align seamlessly with the operational and strategic objectives of CodeCast-Duo. This documentation serves as a detailed guide, assisting our developers in harnessing the full potential of this bespoke API.

## Installation

To install the package, simply run the following command in your project directory:

```bash
npm i @codecast-duo/codecast-duo-telegrambot
```

This command installs the CodeCast-Duo Telegram Bot package, adding it to your project's dependencies.

## Telegram API - Usage Guide

### Creating an Instance of TelegramAPI

To start using the Telegram API, you need to create an instance of the TelegramAPI class. This is done using the constructor, which takes an object of type `TelegramOptions` as its argument. This object contains several configurations that determine how your API instance will behave.

### Example

```javascript
const TelegramBot = require('@codecast-duo/codecast-duo-telegrambot');

// Create a new instance of the Telegram bot
const bot = new TelegramBot({
    telegramToken: "TELEGRAM_TOKEN",
    // Other TelegramOptions fields as needed
});
```

### Configuring TelegramOptions

The `TelegramOptions` object contains various settings that are crucial for the operation of your Telegram bot. Here are the key options you need to configure:

#### TelegramOptions Table

| Option | Type | Description | Default Value |
|----------------|:------:|----------------|----|
| `telegramToken` | `string` | The unique token for your Telegram bot, provided by BotFather. | None (Mandatory) |
| `telegramApi` | `string` | Optional. The URL of the Telegram API. If not specified, the default URL is used. | `'https://api.telegram.org'` |
| `start` | `boolean` | Optional. Determines whether the bot starts processing messages immediately after instantiation. If `false` use [startUpdaters](#startupdater-method) to start polling updates. | true |
| `optionUpdate` | `OptionsUpdate` | Optional. Configuration for receiving updates, including offset, allowed updates, and limit on updates. | [OptionsUpdate Sub-Table](#optionsupdate-sub-table) |
| `optionPollingWaitManager` | `OptionsPollingWaitManage` | Optional. Settings for managing the wait time between polling, including max wait time and timeout action. | [OptionsPollingWaitManage Sub-Table](#optionsupdate-sub-table) |

#### OptionsUpdate Sub-Table

| Option | Type | Description | Default Value |
|----------------|:------:|----------------|----|
| `offset` | `number` | Optional. Identifier of the first update to be returned. | 0 |
| `allowed_updates` | Array<keyof [UpdateTypes](#update-types-table) \| keyof [MessageTypes](#message-types-table)> | Optional. List of update types to be received. | [] |
| `limitUpdates` | `number` | Optional. Limits the number of updates to be retrieved. | 100 |

#### OptionsPollingWaitManage Sub-Table

| Option | Type | Description | Default Value |
|----------------|:------:|----------------|----|
| `maxWaitTime` | `number` | Optional. The maximum waiting time (in milliseconds) allowed before considering the polling process as too long and taking action. | `60000` (60 seconds) |
| `onWait` | `number` | Optional. A callback function that gets executed when the waiting time exceeds `maxWaitTime`. It allows you to define custom actions or error handling when polling takes too long. | Empty function (`() => {}`) |

#### Example

```javascript
const options = {
    telegramToken: 'YOUR_TELEGRAM_BOT_TOKEN',
    telegramApi: 'https://api.telegram.org',
    start: true,
    optionUpdate: {
        offset: 0,
        allowed_updates: ['message', 'edited_message'],
        limitUpdates: 100
    },
    optionPollingWaitManager: {
        maxWaitTime: 3000,
        onWaitTooLong: () => { /* Handle long wait times */ }
    }
};

```

## API Methods

The `onMessag`, `onUpdate` and `onText` are key methods used in the CodeCast-Duo Telegram Bot API for handling various types of events:

### onMessage Method

- `onMessage<K extends `[TelegramTypes.MessageTypesKeys](#message-types-table)`>(event: K, listener: (arg: TelegramTypes.Message[K], message: TelegramTypes.Message) => void)`: This method is used to listen for message-related events. It takes an event type and a listener function as arguments. The event type is one of the keys from `TelegramTypes.MessageTypesKeys`, and the listener function receives the specific message type and the general message object.

### onUpdate Method

- `onUpdate<K extends `[TelegramTypes.UpdateTypesKeys](#update-types-table)`>(event: K, listener: (arg: TelegramTypes.Update[K], update: TelegramTypes.Update) => void)`: Similar to `onMessage`, this method listens for update-related events. It takes an event type from `TelegramTypes.UpdateTypesKeys` and a listener function. The listener function is invoked with the specific update type and the general update object.

### onText Method

- `onText(regexp: RegExp | string, callback: (arg: TelegramTypes.Message) => void)`: This method is designed to detect and respond to specific text patterns in messages. It takes two parameters:

| Parameter | Description |
| --- | --- |
| `regexp` | A `RegExp` or string pattern that the incoming text message must match. |
| `callback` | A function that is called when a message matching the `regexp` is received. This function takes a `TelegramTypes.Message` object as its argument, providing details about the matched message. |

### startUpdater Method

- `startUpdater(): void`: This method is used to start the polling process for updates. It initiates the bot's ability to listen for incoming updates from Telegram. This is particularly useful when your bot is set up to not start automatically, or if you've previously stopped the update polling and need to restart it.

### stopUpdater Method

- `stopUpdater(): void`: The stopUpdaters method is used to stop the polling process. This is useful when you want to temporarily halt your bot from listening to incoming updates, without shutting down the entire bot. This can be handy during maintenance, updating bot logic, or handling unexpected behavior.

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
| `callback_query`| Incoming callback query from a callback button in an inline keyboard. | `TelegramTypes.CallbackQuery` |
| `chat_join_request`| A request to join the chat has been sent. | `TelegramTypes.ChatJoinRequest` |

## Examples

Here's a basic guide on how to use the CodeCast-Duo Telegram Bot API in your project:

```javascript
// Import the required TelegramBot library
const TelegramBot = require('@codecast-duo/codecast-duo-telegrambot');

// Create a new instance of the Telegram bot
const bot = new TelegramBot({
    telegramToken: "TELEGRAM_TOKEN",
});

// Event listener for incoming text messages
bot.onMessage('text', (parameter, message) => {
    // Define the structure of the inline keyboard markup
    const inlineKeyboardMarkup = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Test1', callback_data: 'Callback data test1' }],
                [{ text: 'Test2', callback_data: 'Callback data test2' }]
            ]
        }
    };

    // Send a message back to the chat with the inline keyboard
    bot.sendMessage(message.chat.id, (parameter || 'if parameter empty'), inlineKeyboardMarkup).catch(
        (error) => {
            // Handle errors specifically related to Telegram
            if (error instanceof TelegramError) {
                console.log(error.message);
            } else {
                // Handle any other generic errors
                console.log("is default error");
            }
        }
    )
});

// Event listener for callback queries (e.g., when an inline button is pressed)
bot.onUpdate('callback_query', (callback, update) => {
    // Respond to the callback query
    bot.sendMessage(callback.from.id, (callback.data || 'if callback.data empty'));
    console.log(callback.data);
});

// Check the bot's information (e.g., username)
bot.getMe().then(user => {
    // Log success if user data is retrieved
    if (user) {
        console.log("connected");
    }
});

// Global error event listener
bot.on('error', (error) => {
    // Log any errors encountered
    console.error(error);
});

// Specific error event listener for network-related errors
bot.on('error-NetworkError', (error) => {
    // Log network errors separately
    console.error(error);
});

// Event listener for text commands (e.g., "/echo some text")
bot.onText(/\/echo (.+)/, (message) => {
    // Log the text following the echo command
    console.log(message.text);
});
```

## Advanced Topics

### Error types

Below is a table describing the different types of errors (TelegramErrorTypes) that can occur when interacting with the Telegram API, along with a brief description of each error type:

| Error Type                   | Description |
|------------------------------|-------------|
| **NetworkError**             | Occurs when there is a problem with the network connection, such as a failure to reach the Telegram servers. |
| **ApiError**                 | This error is thrown when there is an issue with the API request, such as invalid parameters or authentication issues. |
| **TimeoutError**             | Occurs when a request to the Telegram API takes too long to respond, exceeding the predefined timeout limit. |
| **InternalServerError**     | Indicates a problem on the Telegram server side, such as a server malfunction or maintenance. |
| **ParsingError**             | This error is encountered when there is an issue in parsing the response from the Telegram API. |
| **UnhandledPromiseRejection**| Occurs when a Promise in the code is rejected but not properly handled with a catch block. |
| **UnknownError**             | Used as a catch-all for any errors that do not fit into the other predefined categories. |

### Error handling

In your Telegram bot implementation, you can set up error handling in two primary ways:

1. **Catch All Errors**: Use `bot.on('error', (error) => {});` to handle all types of errors. This is a general error handler that will catch any error thrown by the bot, regardless of its type. It's useful for logging or handling errors in a generic way.

   ```javascript
   bot.on('error', (error) => {
       console.error('An error occurred:', error);
       // Additional error handling logic can go here
   });
   ```

2. **Catch Specific Types of Errors**: Use `bot.on('error-`[TelegramErrorTypes](#Error-types)`', (error) => {});` to handle specific types of errors. This allows for more granular error handling based on the error type. For example, you can have different handlers for `NetworkError`, `ApiError`, etc.

   ```javascript
   // Handling NetworkError specifically
   bot.on('error-NetworkError', (error) => {
       console.error('Network Error:', error);
       // Specific handling for network errors
   });

   // Handling ApiError specifically
   bot.on('error-ApiError', (error) => {
       console.error('API Error:', error);
       // Specific handling for API errors
   });

   // ... similarly for other error types
   ```

3. **Catch from onMessage(), onUpdate(), onText ()**:
In the context of Telegram bot development using the described library, methods like onMessage, onUpdate, and onText typically return a Promise. The resolution of these promises is usually void, meaning they do not return any value upon successful completion. However, in case of an error, these methods can throw an exception, which is caught in the catch block.

When you use these methods, it's a good practice to handle potential errors that might occur during their execution. This error handling is usually done by attaching a catch block to the promise. The error caught is typically an instance of the TelegramError class, which provides details about what went wrong.

Here's how you might structure your code to include error handling with these methods:

   ```javascript
   // Handling incoming text messages
    bot.onMessage('text', (parameter, message) => {
        // Logic to handle the message
        // ...
    }).catch(error => {
        if (error instanceof TelegramError) {
            console.error('TelegramError occurred:', error.message);
        } else {
            console.error('Unknown error occurred:', error);
        }
    });
   ```

### Description TelegramError
The `TelegramError` class provides a structured way to handle errors encountered during Telegram bot operations. It encapsulates details about the error, including its type and, if available, a specific error code. This class can handle different types of errors, such as network issues or API-related problems, and can be instantiated with detailed information about the underlying error.

#### Properties Table TelegramError

| Parameter    | Type                         | Description                                                                                                                                                   |
|--------------|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `error_code` | `string` \| `undefined`      | An optional code that provides additional information about the error. This is typically specific to the type of error encountered.                           |
| `type`       | `TelegramErrorTypes`         | The type of the error, categorized as one of the predefined `TelegramErrorTypes`, such as `NetworkError`, `ApiError`, etc.                                    |
| `message`    | `string`                     | Inherited from the base `Error` class, this property contains a message describing the error.                                                                |
| `stack`      | `string` \| `undefined`      | Also inherited from the base `Error` class, this property provides a stack trace at the point where the error was instantiated, if available.                 |

## Polling Wait Manager

The "Polling Wait Manager" is a crucial component utilized for the efficient management of the polling process in applications that communicate with a remote server through polling. Polling involves sending periodic requests to a server to retrieve updates or data. The Polling Wait Manager plays a pivotal role in ensuring the effective control of this polling process and handling pauses in the operation of an application.

### Using Polling Wait Manager

The Polling Wait Manager proves to be invaluable in applications that depend on polling to receive updates or data from a remote server. It serves to guarantee the efficient and optimal management of polling, dynamically turning it off when not required. This not only conserves valuable resources but also prevents excessive server load.

### TelegramAPI Class and Polling Wait Manager

The `TelegramAPI` class offers a seamless integration with the Polling Wait Manager, empowering you to take charge of the polling process. Here is an overview of the available methods along with their descriptions:

### Polling Wait Manager Methods

- `getPollingWaitManager(): PollingWaitManager | undefined`: The `getPollingWaitManager` method provides the means to fetch the current Polling Wait Manager object or returns `undefined` if it hasn't been initialized.

- `setPollingWaitManager(name: string, func: () => boolean): void`: With the `setPollingWaitManager` method, you can effortlessly create or modify a function within the Polling Wait Manager. This function requires the name of the function and a callback function that should return a `boolean` value. If the Polling Wait Manager doesn't exist, this method will create it dynamically.

- `removePollingWaitManager(name: string): void` The `removePollingWaitManager` method allows you to selectively remove a function from the Polling Wait Manager by specifying its name. This function deletion process is seamless and effective.

These methods are instrumental in efficiently managing the polling process within your application by defining conditions under which polling should continue or cease. They serve as invaluable tools for optimizing the operation of applications reliant on polling to receive updates or data.

#### Examples 1: Initializing and Using Polling Wait Manager

Here's a basic guide on how to use the CodeCast-Duo Telegram Bot API in your project:

```javascript
const TelegramBot = require('@codecast-duo/codecast-duo-telegrambot');

const bot = new TelegramBot({
    telegramToken: "TELEGRAM_TOKEN",
});

const pollingWaitManager = bot.getPollingWaitManager();

let continue = false;

function shouldContinuePolling() {
    return continue;
}

setTimeout(() => {
        continue = true;
    }, 30000);

bot.setPollingWaitManager("exampleFunction", shouldContinuePolling);
```

In this example, we initialize the TelegramAPI instance, retrieve the Polling Wait Manager, define a function (shouldContinuePolling) that determines whether polling should continue, set this function in the Polling Wait Manager.

#### Examples 2: Removing a Polling Function

```javascript
bot.removePollingWaitManager("exampleFunction");
```
In this example, we remove a polling function named "exampleFunction" from the Polling Wait Manager. This function will no longer be used to determine whether polling should continue.