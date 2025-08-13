import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {TranslocoDirective} from '@jsverse/transloco';
import {AnimateOnScrollDirective} from '../../../shared/ui/animate-on-scroll/animate-on-scroll.directive';
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
        AnimateOnScrollDirective,
        HeadingWithDotComponent,
    ],
})
export class ProfileCoverComponent {}
