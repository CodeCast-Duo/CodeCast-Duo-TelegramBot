import { PollingWaitManager } from './PollingWaitManager';
import { TelegramAPI } from './telegramApi';
import { TelegramError } from './telegramError';
import * as TelegramTypes from './types';
import { OptionsUpdate } from './types';

export class TelegramPolling {
    bot: TelegramAPI;
    lastRequest: any;
    lastUpdate: number = 0;
    updateTimeout: NodeJS.Timeout | null;
    updateFinish: boolean;

    pollingWaitManager: PollingWaitManager | undefined;

    private _optionsUpdate: OptionsUpdate = {
        offset: 0,
        allowed_updates: [],
    };

    public get optionsUpdate(): OptionsUpdate {
        return this._optionsUpdate;
    }

    public set optionsUpdate(value: Partial<OptionsUpdate>) {
        this._optionsUpdate = { ...this._optionsUpdate, ...value };
    }

    constructor(bot: TelegramAPI) {
        this.bot = bot;
        if (this.bot.options.optionUpdate) {
            this.optionsUpdate = this.bot.options.optionUpdate;
        }
        if (this.bot.options.optionPollingWaitManager) {
            PollingWaitManager.optionsPollingWaitManager = this.bot.options.optionPollingWaitManager;
        }
        this.updateTimeout = null;
        this.updateFinish = true;
    }

    getPollingWaitManager(): PollingWaitManager | undefined {
        return this.pollingWaitManager;
    }

    setPollingWaitManager(name: string, func: () => boolean): void {
        if (!this.pollingWaitManager) {
            this.pollingWaitManager = new PollingWaitManager(null);
        }
        this.pollingWaitManager.addShouldContinuePollingFunction(name, func);
    }

    removePollingWaitManager(name: string): void {
        if (this.pollingWaitManager) {
            this.pollingWaitManager.removeShouldContinuePollingFunction(name);
            if(this.pollingWaitManager.shouldContinuePollingFunctions.size == 0){
                this.pollingWaitManager = undefined;
            }
        }
    }

    checkConnection(options: Object): void {
        this.bot.getMe(options);
    }

    start(): void {
        if (this.lastRequest) {
            this.stop().then(() => {
                return this.startPolling();
            });
            return;
        }
        this.startPolling();
    }

    stop(): Promise<void> {
        if (!this.lastRequest) {
            return Promise.resolve();
        }
        const request = this.lastRequest;
        this.lastRequest = null;
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
        }
        this.updateFinish = false;
        return request.finally(() => {
            this.updateFinish = true;
        });
    }

    startPolling(): void {
        if (this.pollingWaitManager) {
            this.pollingWaitManager.checkPollingStatus();
            if (this.pollingWaitManager.shouldContinuePolling()) {
                this.prossesPolling();
            } else {
                this.updateTimeout = setTimeout(() => this.startPolling(), 300);
            }
        } else {
            this.prossesPolling();
        }
    }

    prossesPolling(): void {
        this.lastRequest = this.getUpdates(this.optionsUpdate).then(updates => {
            this.lastUpdate = Date.now();
            updates.forEach(update => {
                this.optionsUpdate.offset = update.update_id + 1;
                this.bot.processUpdate(update);
            });
            return null;
        }).catch((err: Error) => {
            this.bot.sendError(new TelegramError(err));
        }).finally(() => {
            if (this.updateFinish) {
                this.updateTimeout = setTimeout(() => this.startPolling(), 300);
            }
        });
    }

    getUpdates(options: OptionsUpdate): Promise<TelegramTypes.Update[]> {
        return this.bot.getUpdates(options);
    }
}