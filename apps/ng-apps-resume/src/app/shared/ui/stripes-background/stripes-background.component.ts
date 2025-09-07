import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[app-stripes-background]',
    templateUrl: './stripes-background.component.html',
    styleUrl: './stripes-background.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripesBackgroundComponent {}
