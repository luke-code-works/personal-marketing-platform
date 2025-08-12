import {Directive, HostListener, inject, signal} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UmamiProxyService} from '../../util/umami/umami-proxy.service';

@Directive({
    selector: '[appUmamiOptOut]',
})
export class UmamiOptOutDirective {
    private readonly umamiProxyService = inject(UmamiProxyService);
    private readonly snackBar = inject(MatSnackBar);

    private readonly clickCount = signal(0);

    @HostListener('click')
    click() {
        if (!this.umamiProxyService.ready()) {
            return;
        }

        this.clickCount.update((x) => x + 1);

        if (this.clickCount() === 10) {
            this.umamiProxyService.disable('exclude-own-visit');
            this.snackBar.open('Umami tracking disabled.', 'Dismiss', {
                duration: 3000,
            });
        }
    }
}
