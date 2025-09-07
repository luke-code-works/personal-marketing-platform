import {Routes} from '@angular/router';

export const RESUME_ROUTE_PATHS = {
    ROOT: 'resume',
    PROFILE: 'profile',
} as const;

export const RESUME_ROUTES: Routes = [
    {
        path: RESUME_ROUTE_PATHS.ROOT,
        children: [
            {
                path: RESUME_ROUTE_PATHS.PROFILE,
                loadComponent: () => import('../feature-profile/profile.component').then((m) => m.ProfileComponent),
            },
        ],
    },
];
