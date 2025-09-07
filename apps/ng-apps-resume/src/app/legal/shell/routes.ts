import {Routes} from '@angular/router';

export const LEGAL_ROUTE_PATHS = {
    ROOT: 'legal',
    PRIVACY_POLICY: 'privacy-policy',
    LEGAL_NOTICE: 'legal-notice',
} as const;

export const LEGAL_ROUTES: Routes = [
    {
        path: LEGAL_ROUTE_PATHS.ROOT,
        children: [
            {
                path: LEGAL_ROUTE_PATHS.PRIVACY_POLICY,
                loadComponent: () =>
                    import('../feature-privacy-policy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent),
            },
            {
                path: LEGAL_ROUTE_PATHS.LEGAL_NOTICE,
                loadComponent: () =>
                    import('../feature-legal-notice/legal-notice.component').then((m) => m.LegalNoticeComponent),
            },
        ],
    },
];
