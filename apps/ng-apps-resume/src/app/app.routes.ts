import {Routes} from '@angular/router';
import {LEGAL_ROUTES} from './legal/shell/routes';
import {RESUME_ROUTE_PATHS, RESUME_ROUTES} from './resume/shell/routes';

export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: `${RESUME_ROUTE_PATHS.ROOT}/${RESUME_ROUTE_PATHS.PROFILE}`,
    },
    ...RESUME_ROUTES,
    ...LEGAL_ROUTES,
    {
        path: '**',
        redirectTo: `${RESUME_ROUTE_PATHS.ROOT}/${RESUME_ROUTE_PATHS.PROFILE}`,
    },
];
