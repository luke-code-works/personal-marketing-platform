import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[app-stripes-header-background]',
    templateUrl: './stripes-header-background.component.html',
    styleUrl: './stripes-header-background.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripesHeaderBackgroundComponent {}

