import {makeEnvironmentProviders, provideAppInitializer} from '@angular/core';
import {initializeUmami$} from './umami-init.functions';
import {sendUmamiKeepaliveEvents$} from './umami-keepalive.functions';
import {UmamiProxyService} from './umami-proxy.service';

export function provideUmami() {
    return makeEnvironmentProviders([
        UmamiProxyService,
        provideAppInitializer(() => {
            initializeUmami$().subscribe(); // Initialize, but do not wait for completion
        }),
        provideAppInitializer(() => {
            sendUmamiKeepaliveEvents$().subscribe(); // Initialize, but do not wait for completion
        }),
    ]);
}
