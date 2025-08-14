import {isDevMode} from '@angular/core';
import {TranslocoConfig, translocoConfig} from '@jsverse/transloco';
import {MessageformatConfig} from '@jsverse/transloco-messageformat';
import {Locale} from './locale';

export const createTranslocoConfigWithDefault = (
    supportedLocales: Locale[],
    defaultLocale: Locale,
    fallbackLocale: Locale,
    config?: Partial<TranslocoConfig>,
): TranslocoConfig =>
    translocoConfig({
        availableLangs: supportedLocales,
        defaultLang: defaultLocale,
        fallbackLang: fallbackLocale,
        failedRetries: 3,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        ...config,
    });

export const createMessageformatConfigWithDefault = (
    supportedLocales: Locale[],
    config?: Partial<MessageformatConfig>,
): MessageformatConfig => ({
    locales: supportedLocales,
    requireAllArguments: true,
    strict: true,
    ...config,
});

export const createPersistLangConfig = () => ({storage: {useValue: localStorage}});
