import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {provideTranslocoScope} from '@jsverse/transloco';
import {LogoTitleComponent} from '../shared/ui/logo-title/logo-title.component';
import {RouteFragmentLinksComponent} from '../shared/ui/route-fragment-links/route-fragment-links.component';
import {StripesTopLeftBackgroundComponent} from '../shared/ui/stripes-top-left-background/stripes-top-left-background.component';
import {provideNavigation} from '../shared/util/navigation/provider';
import {withRouteFragmentNavigation} from '../shared/util/route-fragment-navigation/provider';
import {Locale} from '../shared/util/transloco/locale';
import {createTranslocoInlineLoader} from '../shared/util/transloco/transloco-inline-loader-factory';
import {XorCipherPipe} from '../shared/util/xor-cipher/xor-cipher.pipe';
import {FooterComponent} from './ui/footer/footer.component';

const globalTranslocoScope = {
    scope: 'global',
    loader: createTranslocoInlineLoader((locale: Locale) => import(`../../i18n/${locale}.json`), ['en-US', 'de-DE']),
};

@Component({
    selector: 'app-root,body[app-root]',
    templateUrl: './root.component.html',
    styleUrl: './root.component.scss',
    imports: [
        StripesTopLeftBackgroundComponent,
        LogoTitleComponent,
        RouteFragmentLinksComponent,
        RouterOutlet,
        XorCipherPipe,
        FooterComponent,
    ],
    providers: [provideNavigation(withRouteFragmentNavigation()), provideTranslocoScope(globalTranslocoScope)],
})
export class RootComponent {}
