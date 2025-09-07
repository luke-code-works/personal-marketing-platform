import {provideHttpClient} from '@angular/common/http';
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import {provideMaterialSymbols} from './shared/util/material-symbols/provider';
import {provideI18nUsingTransloco} from './shared/util/transloco/providers';
import {trustScriptUrlByOrigins} from './shared/util/trusted-types/functions';
import {provideDOMPurifyTrustedType} from './shared/util/trusted-types/provider';
import {provideUmami} from './shared/util/umami/provider';
import {provideDefaultXorCipherDefaultKey} from './shared/util/xor-cipher/provider';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(
            APP_ROUTES,
            withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}),
        ),
        provideHttpClient(),
        provideMaterialSymbols(),
        provideDefaultXorCipherDefaultKey(
            (() => {
                const part1 = atob('c3VwZXItZHVwZXI=');
                const part2 = String.fromCharCode(45);
                const part3 = [...'agem-agig'].reverse().join('');
                const part4 = String.fromCharCode(45);
                const part5 = 'key';

                return part1 + part2 + part3 + part4 + part5;
            })(),
        ),
        provideI18nUsingTransloco({
            supportedLocales: ['en-US', 'de-DE'],
            defaultLocale: 'de-DE',
            fallbackLocale: 'en-US',
        }),
        provideDOMPurifyTrustedType({
            createScriptURL: (input: string) => trustScriptUrlByOrigins(input, ['cloud.umami.is']),
        }),
        provideUmami(),
    ],
};
