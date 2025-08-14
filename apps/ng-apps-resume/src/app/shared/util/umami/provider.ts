import {makeEnvironmentProviders, provideAppInitializer} from '@angular/core';
import {rxEffect} from 'ngxtension/rx-effect';
import {initializeUmami$} from './umami-init.functions';
import {sendUmamiKeepaliveEvents$} from './umami-keepalive.functions';
import {UmamiProxyService} from './umami-proxy.service';

export function provideUmami() {
    return makeEnvironmentProviders([
        UmamiProxyService,
        provideAppInitializer(() => {
            // Initialize, but do not wait for completion
            rxEffect(initializeUmami$());
            rxEffect(sendUmamiKeepaliveEvents$());
        }),
    ]);
}
