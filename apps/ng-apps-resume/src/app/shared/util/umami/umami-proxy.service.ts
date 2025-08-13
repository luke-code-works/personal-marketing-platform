import {computed, effect, signal} from '@angular/core';
import {UmamiError} from './umami-error';
import {Umami} from './umami-window.type';

export class UmamiProxyService {
    readonly umami = signal<Umami | undefined>(undefined);
    readonly ready = computed(() => this.umami() != null);

    private readonly _enabled = signal(localStorage.getItem(umamiDisabledStorageKey) !== '1'); // Enabled by default
    readonly enabled = this._enabled.asReadonly();

    constructor() {
        effect(() => {
            if (!this._enabled()) {
                localStorage.setItem(umamiDisabledStorageKey, '1');
            } else {
                localStorage.removeItem(umamiDisabledStorageKey);
            }
        });
    }

    async enable(reason: 'by-user' | 'include-own-visit') {
        this.getUmamiOrThrow();

        this._enabled.set(true);

        await this.track('opted-in', {reason});
    }

    async disable(reason: 'by-user' | 'exclude-own-visit') {
        this.getUmamiOrThrow();

        await this.track('opted-out', {reason});

        this._enabled.set(false);
    }

    async track(name?: string, data?: object): Promise<unknown> {
        const umami = this.getUmamiOrThrow();

        if (name && data) {
            return umami.track(name, data);
        }

        if (name) {
            return umami.track(name);
        }

        if (data) {
            return umami.track(data);
        }

        return umami.track();
    }

    async identify(uniqueId?: string, data?: object): Promise<unknown> {
        const umami = this.getUmamiOrThrow();

        if (uniqueId && data) {
            return umami.identify(uniqueId, data);
        }

        if (uniqueId) {
            return umami.identify(uniqueId);
        }

        if (data) {
            return umami.identify(data);
        }

        throw new UmamiError('Umami identification requires uniqueId or other data.');
    }

    private getUmamiOrThrow() {
        const umami = this.umami();

        if (!umami) {
            throw new UmamiError('Umami is not ready. Please ensure it is initialized before use.');
        }

        return umami;
    }
}

const umamiDisabledStorageKey = 'umami.disabled';
