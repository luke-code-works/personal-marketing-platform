import {makeEnvironmentProviders, provideAppInitializer} from '@angular/core';
import {initializeUmami$} from './umami-init.functions';
import {UmamiProxyService} from './umami-proxy.service';

export function provideUmami() {
    return makeEnvironmentProviders([provideAppInitializer(initializeUmami$), UmamiProxyService]);
}
