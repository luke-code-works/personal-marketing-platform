import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-header-content-spacer',
    templateUrl: './header-content-spacer.component.html',
    styleUrl: './header-content-spacer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderContentSpacerComponent {}
