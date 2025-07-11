import {ChangeDetectionStrategy, Component} from '@angular/core';
import {provideTranslocoScope, TranslocoDirective} from '@jsverse/transloco';
import {GSAPScrollAnimateDirective} from '../../shared/ui/gsap-scroll-animate/gsap-scroll-animate.directive';
import {HeadingWithDotComponent} from '../../shared/ui/heading-with-dot/heading-with-dot.component';
import {TextObfuscationComponent} from '../../shared/ui/text-obfuscation/text-obfuscation.component';
import {UmamiTrackEventDirective} from '../../shared/ui/umami-track-event/umami-track-event.directive';
import {createTranslocoInlineLoader} from '../../shared/util/transloco/transloco-inline-loader-factory';
import {XorCipherPipe} from '../../shared/util/xor-cipher/xor-cipher.pipe';

const privacyPolicyTranslocoScope = {
    scope: 'privacy-policy',
    loader: createTranslocoInlineLoader((locale: string) => import(`./i18n/${locale}.json`), ['en-US', 'de-DE']),
};

@Component({
    selector: 'app-legal-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrl: './privacy-policy.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TranslocoDirective,
        HeadingWithDotComponent,
        XorCipherPipe,
        TextObfuscationComponent,
        GSAPScrollAnimateDirective,
        UmamiTrackEventDirective,
    ],
    providers: [provideTranslocoScope(privacyPolicyTranslocoScope)],
})
export class PrivacyPolicyComponent {}
