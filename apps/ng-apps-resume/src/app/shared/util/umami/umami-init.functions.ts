import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {assertInInjectionContext, ErrorHandler, inject, isDevMode, PLATFORM_ID} from '@angular/core';
import {catchError, filter, interval, map, of, switchMap, take, tap, timeout} from 'rxjs';
import {DOMPurifyTrustedTypeService} from '../trusted-types/dom-purify-trusted-type.service';
import {UmamiConfig} from './umami-config.type';
import {UmamiError} from './umami-error';
import {UmamiProxyService} from './umami-proxy.service';
import {UmamiWindow} from './umami-window.type';

export function fetchUmamiConfig$(path: string, deps: {httpClient: HttpClient}) {
    // TODO: Replace with zod someday
    return deps.httpClient.get<{umami: UmamiConfig}>(path).pipe(
        map((config) => {
            if (!config.umami) {
                throw new UmamiError('Umami config is missing.');
            }

            return config.umami;
        }),
        map((config) => {
            if (!config.scriptUrl || !config.websiteId) {
                throw new UmamiError('Umami config is missing required scriptUrl or websiteId.');
            }

            return config;
        }),
    );
}

export function appendUmamiScript(
    config: UmamiConfig,
    deps: {document: Document; platformId: object; domPurifyTrustedTypesService: DOMPurifyTrustedTypeService},
): boolean {
    if (!isPlatformBrowser(deps.platformId)) {
        // Not running in browser platform; skip script injection
        return false;
    }

    if (config.enabled === false) {
        // Umami not enabled: skip script injection
        return false;
    }

    const selector = `script[data-website-id="${config.websiteId}"]`;
    if (deps.document.querySelector(selector)) {
        // Script already present; skip injection
        return false;
    }

    if (!deps.document.head) {
        throw new UmamiError('Unable to access <head> element in document.');
    }

    const script = deps.document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-website-id', config.websiteId);
    script.src = (deps.domPurifyTrustedTypesService.policy?.createScriptURL(config.scriptUrl) ??
        config.scriptUrl) as unknown as string;

    deps.document.head.appendChild(script);
    return true;
}

export function waitForUmamiScript$() {
    return interval(250).pipe(
        map(() => window.umami),
        filter((umami) => umami != null),
        take(1),
        timeout(30 * 1000),
        catchError(() => {
            throw new UmamiError('Umami script did not become available in time.');
        }),
    );
}

export function initializeUmami$() {
    assertInInjectionContext(initializeUmami$);

    const document = inject(DOCUMENT);
    const platformId = inject(PLATFORM_ID);
    const httpClient = inject(HttpClient);
    const errorHandler = inject(ErrorHandler);
    const umamiProxyService = inject(UmamiProxyService);
    const domPurifyTrustedTypesService = inject(DOMPurifyTrustedTypeService);

    const path = `config/umami.config${isDevMode() ? '.dev' : ''}.json`;

    return fetchUmamiConfig$(path, {httpClient}).pipe(
        map((config) => appendUmamiScript(config, {document, platformId, domPurifyTrustedTypesService})),
        filter((scriptAppended) => scriptAppended),
        switchMap(waitForUmamiScript$),
        tap((umami) => umamiProxyService.umami.set(umami)),
        catchError((error) => {
            const handledError =
                error instanceof UmamiError
                    ? error
                    : new UmamiError('Umami initialization failed', {originalError: error});
            errorHandler.handleError(handledError);

            // Continue the stream gracefully by emitting null
            return of(null);
        }),
    );
}

declare const window: UmamiWindow;
