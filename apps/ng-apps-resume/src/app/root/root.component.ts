import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {provideTranslocoScope, TranslocoDirective, TranslocoService} from '@jsverse/transloco';
import {appRoutes} from '../app.routes';
import {CopyrightNoticeComponent} from '../legal/ui/copyright-notice/copyright-notice.component';
import {GitHubIconLinkComponent} from '../resume/ui/github-icon-link/github-icon-link.component';
import {LinkedinIconLinkComponent} from '../resume/ui/linkedin-icon-link/linkedin-icon-link.component';
import {MailIconLinkComponent} from '../resume/ui/mail-icon-link/mail-icon-link.component';
import {FooterContainerComponent} from '../shared/ui/footer-container/footer-container.component';
import {HeaderContainerComponent} from '../shared/ui/header-container/header-container.component';
import {LogoTitleComponent} from '../shared/ui/logo-title/logo-title.component';
import {RouteFragmentLinksComponent} from '../shared/ui/route-fragment-links/route-fragment-links.component';
import {UmamiOptOutDirective} from '../shared/ui/umami-opt-out/umami-opt-out.directive';
import {UmamiTrackEventDirective} from '../shared/ui/umami-track-event/umami-track-event.directive';
import {provideNavigation} from '../shared/util/navigation/provider';
import {withRouteFragmentNavigation} from '../shared/util/route-fragment-navigation/provider';
import {Locale} from '../shared/util/transloco/locale';
import {createTranslocoInlineLoader} from '../shared/util/transloco/transloco-inline-loader-factory';
import {XorCipherPipe} from '../shared/util/xor-cipher/xor-cipher.pipe';

export const globalTranslocoScope = {
    scope: 'global',
    loader: createTranslocoInlineLoader((locale: Locale) => import(`../../i18n/${locale}.json`), ['en-US', 'de-DE']),
};

@Component({
    selector: 'app-root,body[app-root]',
    templateUrl: './root.component.html',
    styleUrl: './root.component.scss',
    imports: [
        TranslocoDirective,
        UmamiOptOutDirective,
        UmamiTrackEventDirective,
        RouterLink,
        RouterLinkActive,

        HeaderContainerComponent,
        LogoTitleComponent,
        RouteFragmentLinksComponent,
        FooterContainerComponent,
        LinkedinIconLinkComponent,
        GitHubIconLinkComponent,
        CopyrightNoticeComponent,
        MailIconLinkComponent,
        RouterOutlet,

        XorCipherPipe,
    ],
    providers: [provideNavigation(withRouteFragmentNavigation()), provideTranslocoScope(globalTranslocoScope)],
})
export class RootComponent {
    protected translocoService = inject(TranslocoService);

    protected readonly defaultRedirectPath =
        appRoutes.find((route) => route.path === '' && route.redirectTo != null)?.redirectTo ?? '';

    protected toggleLocale() {
        const currentLang = this.translocoService.getActiveLang();
        const newLang = currentLang === 'de-DE' ? 'en-US' : 'de-DE';
        this.translocoService.setActiveLang(newLang);
    }
}
