import { Update } from './types/telegramTypes';
import { Telegram } from '.';

export class TelegramPolling {
    bot: Telegram;
    lastRequest: any;
    lastUpdate: number = 0;
    updateTimeout: NodeJS.Timeout | null;
    updateFinish: boolean;

    options = {
        offset: 0
    }

    constructor(bot: Telegram) {
        this.bot = bot;
        this.updateTimeout = null;
        this.updateFinish = true;
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
        this.lastRequest = this.getUpdates().then(updates => {
            this.lastUpdate = Date.now();
            updates.forEach(update => {
                this.options.offset = update.update_id + 1;
                this.bot.processUpdate(update);
            });
            return null;
        }).catch(err => {
        }).finally(() => {
            if (this.updateFinish) {
                this.updateTimeout = setTimeout(() => this.startPolling(), 300);
            }
        });
    }

    getUpdates(): Promise<Update[]> {
        return this.bot.getUpdates(this.options);
    }
}