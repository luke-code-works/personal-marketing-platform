import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {provideTranslocoScope} from '@jsverse/transloco';
import {provideNavigation} from '../shared/util/navigation/provider';
import {withRouteFragmentNavigation} from '../shared/util/route-fragment-navigation/provider';
import {Locale} from '../shared/util/transloco/locale';
import {createTranslocoInlineLoader} from '../shared/util/transloco/transloco-inline-loader-factory';
import {FooterComponent} from './ui/footer/footer.component';
import {HeaderComponent} from './ui/header/header.component';

const globalTranslocoScope = {
    scope: 'global',
    loader: createTranslocoInlineLoader((locale: Locale) => import(`../../i18n/${locale}.json`), ['en-US', 'de-DE']),
};

@Component({
    selector: 'app-root,body[app-root]',
    templateUrl: './root.component.html',
    styleUrl: './root.component.scss',
    imports: [HeaderComponent, RouterOutlet, FooterComponent],
    providers: [provideNavigation(withRouteFragmentNavigation()), provideTranslocoScope(globalTranslocoScope)],
})
export class RootComponent {}
