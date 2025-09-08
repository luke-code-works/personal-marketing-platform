import {Component} from '@angular/core';
import {LogoTitleComponent} from '../../../shared/ui/logo-title/logo-title.component';
import {RouteFragmentLinksComponent} from '../../../shared/ui/route-fragment-links/route-fragment-links.component';
import {StripesTopLeftBackgroundComponent} from '../../../shared/ui/stripes-top-left-background/stripes-top-left-background.component';
import {XorCipherPipe} from '../../../shared/util/xor-cipher/xor-cipher.pipe';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'header[app-header]',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [StripesTopLeftBackgroundComponent, LogoTitleComponent, RouteFragmentLinksComponent, XorCipherPipe],
})
export class HeaderComponent {}
