import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TranslocoDirective, TranslocoService} from '@jsverse/transloco';
import {APP_ROUTES} from '../../../app.routes';
import {CopyrightNoticeComponent} from '../../../legal/ui/copyright-notice/copyright-notice.component';
import {GitHubIconLinkComponent} from '../../../resume/ui/github-icon-link/github-icon-link.component';
import {LinkedinIconLinkComponent} from '../../../resume/ui/linkedin-icon-link/linkedin-icon-link.component';
import {MailIconLinkComponent} from '../../../resume/ui/mail-icon-link/mail-icon-link.component';
import {StripesBottomRightBackgroundComponent} from '../../../shared/ui/stripes-bottom-right-background/stripes-bottom-right-background.component';
import {UmamiOptOutDirective} from '../../../shared/ui/umami-opt-out/umami-opt-out.directive';
import {UmamiTrackEventDirective} from '../../../shared/ui/umami-track-event/umami-track-event.directive';
import {XorCipherPipe} from '../../../shared/util/xor-cipher/xor-cipher.pipe';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'footer[app-footer]',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: [
        RouterLink,
        RouterLinkActive,
        TranslocoDirective,
        UmamiOptOutDirective,
        UmamiTrackEventDirective,

        CopyrightNoticeComponent,
        GitHubIconLinkComponent,
        LinkedinIconLinkComponent,
        MailIconLinkComponent,
        StripesBottomRightBackgroundComponent,

        XorCipherPipe,
    ],
})
export class FooterComponent {
    protected translocoService = inject(TranslocoService);

    protected readonly defaultRedirectPath =
        APP_ROUTES.find((route) => route.path === '' && route.redirectTo != null)?.redirectTo ?? '';

    protected toggleLocale() {
        const currentLang = this.translocoService.getActiveLang();
        const newLang = currentLang === 'de-DE' ? 'en-US' : 'de-DE';
        this.translocoService.setActiveLang(newLang);
    }
}
