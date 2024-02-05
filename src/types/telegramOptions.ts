import { MessageTypes, UpdateTypes } from "./eventsTypes";

export type TelegramOptions = {
    telegramToken: string,
    telegramApi?: string | null,
    start?: boolean,
    optionUpdate?: OptionsUpdate,
    optionPollingWaitManager?: OptionsPollingWaitManage,
}

export type OptionsUpdate = {
    offset: number,
    allowed_updates: Array<keyof UpdateTypes>,
    limit?: number,
};

export type OptionsPollingWaitManage = {
    maxWaitTime: number,
    onWaitTooLong: () => void,
};
