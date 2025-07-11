import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {TranslocoDirective} from '@jsverse/transloco';
import {GSAPScrollAnimateDirective} from '../../../shared/ui/gsap-scroll-animate/gsap-scroll-animate.directive';
import {HeadingWithDotComponent} from '../../../shared/ui/heading-with-dot/heading-with-dot.component';
import {SparklingStarsParticleBackgroundComponent} from '../../../shared/ui/sparkling-stars-particle-background/sparkling-stars-particle-background.component';

@Component({
    selector: 'section[app-resume-profile-cover],app-resume-profile-cover',
    templateUrl: './profile-cover.component.html',
    styleUrl: './profile-cover.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        SparklingStarsParticleBackgroundComponent,
        MatIconModule,
        TranslocoDirective,
        GSAPScrollAnimateDirective,
        HeadingWithDotComponent,
    ],
})
export class ProfileCoverComponent {}
