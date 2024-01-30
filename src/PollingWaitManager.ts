import { OptionsPollingWaitManage } from "./types";

export class PollingWaitManager {
    private waitStartTime: number | null = null;
    private _shouldContinuePollingFunctions: Map<string, () => boolean> = new Map();

    
    public get shouldContinuePollingFunctions() : Map<string, () => boolean> {
        return this._shouldContinuePollingFunctions;
    }
    

    private static _optionsPollingWaitManager: OptionsPollingWaitManage = {
        maxWaitTime: 60000,
        onWaitTooLong: ()=>{},
    };

    public static get optionsPollingWaitManager(): OptionsPollingWaitManage {
        return PollingWaitManager._optionsPollingWaitManager;
    }

    public static set optionsPollingWaitManager(value: Partial<OptionsPollingWaitManage>) {
        PollingWaitManager._optionsPollingWaitManager = { ...PollingWaitManager._optionsPollingWaitManager, ...value };
    }

    constructor(options:Partial<OptionsPollingWaitManage> | null) {
        if(options){
            PollingWaitManager.optionsPollingWaitManager = options;
        }
    }

    public checkPollingStatus(): void {
        if (this.shouldContinuePolling()) {
            this.resetWaitingTimer();
        } else {
            this.startWaiting();
            if (this.isWaitingTooLong()) {
                PollingWaitManager._optionsPollingWaitManager.onWaitTooLong();
            }
        }
    }

    public addShouldContinuePollingFunction(name: string, func: () => boolean): void {
        this._shouldContinuePollingFunctions.set(name, func);
    }

    public removeShouldContinuePollingFunction(name: string): void {
        this._shouldContinuePollingFunctions.delete(name);
    }

    public shouldContinuePolling(): boolean {
        return Array.from(this._shouldContinuePollingFunctions.values()).some(func => func() === true);
    }

    private startWaiting() {
        if (this.waitStartTime === null) {
            this.waitStartTime = Date.now();
        }
    }

    private resetWaitingTimer() {
        this.waitStartTime = null;
    }

    private isWaitingTooLong(): boolean {
        return this.waitStartTime !== null && (Date.now() - this.waitStartTime) > PollingWaitManager._optionsPollingWaitManager.maxWaitTime;
    }
}
