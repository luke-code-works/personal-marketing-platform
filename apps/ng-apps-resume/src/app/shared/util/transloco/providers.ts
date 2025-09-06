import {EnvironmentProviders, makeEnvironmentProviders, provideAppInitializer} from '@angular/core';
import {
    provideTransloco,
    provideTranslocoConfig,
    provideTranslocoMissingHandler,
    TranslocoConfig,
} from '@jsverse/transloco';
import {provideTranslocoLocale} from '@jsverse/transloco-locale';
import {MessageformatConfig} from '@jsverse/transloco-messageformat';
import {provideTranslocoPersistLang} from '@jsverse/transloco-persist-lang';
import {rxEffect} from 'ngxtension/rx-effect';
import {Locale} from './locale';
import {createPersistLangConfig, createTranslocoConfigWithDefault} from './transloco-config-factory';
import {changeLocaleInDocument$} from './transloco-document.functions';
import {TranslocoErrorOnMissingHandler} from './transloco-error-on-missing-handler.service';

type i18nWithTranslocoOptions = {
    supportedLocales?: Locale[];
    defaultLocale?: Locale;
    fallbackLocale?: Locale;
    overridingTranslocoConfig?: TranslocoConfig;
    overridingMessageformatConfig?: MessageformatConfig;
};

export function provideI18nUsingTransloco(options?: i18nWithTranslocoOptions): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideTransloco({config: {}}),
        provideTranslocoMissingHandler(TranslocoErrorOnMissingHandler),
        provideTranslocoLocale(),
        provideTranslocoConfig(
            createTranslocoConfigWithDefault(
                options?.supportedLocales ?? ['en-US'],
                options?.defaultLocale ?? 'en-US',
                options?.fallbackLocale ?? 'en-US',
                options?.overridingTranslocoConfig,
            ),
        ),
        // provideTranslocoMessageformat(
        //     createMessageformatConfigWithDefault(
        //         options?.supportedLocales ?? ['en-US'],
        //         options?.overridingMessageformatConfig,
        //     ),
        // ),
        provideTranslocoPersistLang(createPersistLangConfig()),
        provideAppInitializer(() => {
            // Initialize, but do not wait for completion
            rxEffect(changeLocaleInDocument$());
        }),
    ]);
}
