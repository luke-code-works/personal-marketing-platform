import {assertInInjectionContext, ErrorHandler, inject} from '@angular/core';
import {filter, interval, switchMap, take} from 'rxjs';
import {UmamiError} from './umami-error';
import {UmamiProxyService} from './umami-proxy.service';

export function sendUmamiKeepaliveEvents$() {
    assertInInjectionContext(sendUmamiKeepaliveEvents$);

    const errorHandler = inject(ErrorHandler);
    const umamiProxyService = inject(UmamiProxyService);

    return interval(30 * 1000).pipe(
        take(60), // Limit (30 minutes)
        filter(() => umamiProxyService.ready()),
        switchMap(async () => {
            try {
                await umamiProxyService.track('keepalive');
            } catch (error) {
                errorHandler.handleError(
                    new UmamiError('Umami failed to send keepalive event', {originalError: error}),
                );
            }
        }),
    );
}
