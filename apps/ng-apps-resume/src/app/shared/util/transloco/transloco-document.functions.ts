import {assertInInjectionContext, DOCUMENT, inject} from '@angular/core';
import {TranslocoService} from '@jsverse/transloco';
import {tap} from 'rxjs';

export function changeLocaleInDocument$() {
    assertInInjectionContext(changeLocaleInDocument$);

    const document = inject(DOCUMENT);
    const translocoService = inject(TranslocoService);

    return translocoService.langChanges$.pipe(
        tap((lang) => {
            document.documentElement.lang = lang;
        }),
    );
}
