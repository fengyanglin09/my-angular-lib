import { Routes } from '@angular/router';

import { Lesson04ChildRoutes } from './lesson-04-child-routes/lesson-04-child-routes';
import { ProjectActivity } from './lesson-04-child-routes/project-activity';
import { ProjectOverview } from './lesson-04-child-routes/project-overview';
import { ProjectSettings } from './lesson-04-child-routes/project-settings';
import { AccountDashboard } from './lesson-05-named-outlets/account-dashboard';
import { AccountDetails } from './lesson-05-named-outlets/account-details';
import { AccountHelpPanel } from './lesson-05-named-outlets/account-help-panel';
import { Lesson05NamedOutlets } from './lesson-05-named-outlets/lesson-05-named-outlets';
import { AccountNotesPanel } from './lesson-05-named-outlets/account-notes-panel';
import { Lesson06RedirectsWildcards } from './lesson-06-redirects-wildcards/lesson-06-redirects-wildcards';
import { RedirectDemoDashboard } from './lesson-06-redirects-wildcards/redirect-demo-dashboard';
import { RedirectDemoReports } from './lesson-06-redirects-wildcards/redirect-demo-reports';
import { RedirectDemoNotFound } from './lesson-06-redirects-wildcards/redirect-demo-not-found';
import { Lesson07ProgrammaticNavigation } from './lesson-07-programmatic-navigation/lesson-07-programmatic-navigation';
import { NavigationInboxPanel } from './lesson-07-programmatic-navigation/navigation-inbox-panel';
import { NavigationArchivePanel } from './lesson-07-programmatic-navigation/navigation-archive-panel';
import { adminAccessGuard } from './lesson-08-route-guards/admin-access.guard';
import { GuardDeniedPanel } from './lesson-08-route-guards/guard-denied-panel';
import { GuardPublicPanel } from './lesson-08-route-guards/guard-public-panel';
import { GuardAdminPanel } from './lesson-08-route-guards/guard-admin-panel';
import { Lesson08RouteGuards } from './lesson-08-route-guards/lesson-08-route-guards';
import { projectResolver } from './lesson-09-route-resolvers/project.resolver';
import { Lesson09RouteResolvers } from './lesson-09-route-resolvers/lesson-09-route-resolvers';
import { CanDeactivateEditorPanel } from './lesson-10-can-deactivate/can-deactivate-editor-panel';
import { Lesson10CanDeactivate } from './lesson-10-can-deactivate/lesson-10-can-deactivate';
import { CanDeactivatePreviewPanel } from './lesson-10-can-deactivate/can-deactivate-preview-panel';
import { pendingChangesGuard } from './lesson-10-can-deactivate/pending-changes.guard';
import { Lesson11RouteData } from './lesson-11-route-data/lesson-11-route-data';
import { RouteDataPanel } from './lesson-11-route-data/route-data-panel';
import { Lesson12LazyRoutes } from './lesson-12-lazy-routes/lesson-12-lazy-routes';
import { CanMatchDeniedPanel } from './lesson-13-can-match/can-match-denied-panel';
import { CanMatchPublicPanel } from './lesson-13-can-match/can-match-public-panel';
import { Lesson13CanMatch } from './lesson-13-can-match/lesson-13-can-match';
import { protectedFeatureCanMatchGuard } from './lesson-13-can-match/protected-feature-can-match.guard';
import { Lesson14RouterEvents } from './lesson-14-router-events/lesson-14-router-events';
import { routerEventsAccessGuard } from './lesson-14-router-events/router-events-access.guard';
import { RouterEventsDeniedPanel } from './lesson-14-router-events/router-events-denied-panel';
import { RouterEventsHomePanel } from './lesson-14-router-events/router-events-home-panel';
import { routerEventsProfileResolver } from './lesson-14-router-events/router-events-profile.resolver';
import { RouterEventsProfilePanel } from './lesson-14-router-events/router-events-profile-panel';
import { RouterEventsReportPanel } from './lesson-14-router-events/router-events-report-panel';
import { Lesson15RouteMetadataShell } from './lesson-15-route-metadata-shell/lesson-15-route-metadata-shell';
import { MetadataBillingPanel } from './lesson-15-route-metadata-shell/metadata-billing-panel';
import { MetadataOverviewPanel } from './lesson-15-route-metadata-shell/metadata-overview-panel';
import { MetadataSettingsPanel } from './lesson-15-route-metadata-shell/metadata-settings-panel';
import { Lesson16RouteProviders } from './lesson-16-route-providers/lesson-16-route-providers';
import { RouteProvidersActivityPanel } from './lesson-16-route-providers/route-providers-activity-panel';
import { RouteProvidersOverviewPanel } from './lesson-16-route-providers/route-providers-overview-panel';
import { RouteProvidersSettingsPanel } from './lesson-16-route-providers/route-providers-settings-panel';
import { RouteProvidersWorkspaceStore } from './lesson-16-route-providers/route-providers-workspace-store';
import { Lesson17PreloadingLazyRoutes } from './lesson-17-preloading-lazy-routes/lesson-17-preloading-lazy-routes';
import { PreloadingOverviewPanel } from './lesson-17-preloading-lazy-routes/preloading-overview-panel';
import { componentInputWorkspaceResolver } from './lesson-18-component-input-binding/component-input-workspace.resolver';
import { Lesson18ComponentInputBinding } from './lesson-18-component-input-binding/lesson-18-component-input-binding';
import { Lesson19RunGuardsResolvers } from './lesson-19-run-guards-resolvers/lesson-19-run-guards-resolvers';
import { reportResolver } from './lesson-19-run-guards-resolvers/report.resolver';
import { Lesson20ProgrammaticResolverRerun } from './lesson-20-programmatic-resolver-rerun/lesson-20-programmatic-resolver-rerun';
import { supportTicketResolver } from './lesson-20-programmatic-resolver-rerun/support-ticket.resolver';
import { ComponentlessOverviewPanel } from './lesson-21-componentless-parent/componentless-overview-panel';
import { ComponentlessSettingsPanel } from './lesson-21-componentless-parent/componentless-settings-panel';
import { Lesson21ComponentlessParent } from './lesson-21-componentless-parent/lesson-21-componentless-parent';

export const angularRouteLessonsRoutes: Routes = [
  {
    path: 'lesson-01-route-basics',
    loadComponent: () =>
      import('./lesson-01-route-basics/lesson-01-route-basics').then(
        (m) => m.Lesson01RouteBasics,
      ),
  },
  {
    path: 'lesson-02-route-params',
    pathMatch: 'full',
    redirectTo: 'lesson-02-route-params/project-101',
  },
  {
    path: 'lesson-02-route-params/:projectId',
    loadComponent: () =>
      import('./lesson-02-route-params/lesson-02-route-params').then(
        (m) => m.Lesson02RouteParams,
      ),
  },
  {
    path: 'lesson-03-query-params',
    loadComponent: () =>
      import('./lesson-03-query-params/lesson-03-query-params').then(
        (m) => m.Lesson03QueryParams,
      ),
  },
  {
    path: 'lesson-04-child-routes',
    component: Lesson04ChildRoutes,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        component: ProjectOverview,
      },
      {
        path: 'activity',
        component: ProjectActivity,
      },
      {
        path: 'settings',
        component: ProjectSettings,
      },
    ],
  },
  {
    path: 'lesson-05-named-outlets',
    component: Lesson05NamedOutlets,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: AccountDashboard,
      },
      {
        path: 'details',
        component: AccountDetails,
      },
      {
        path: 'notes',
        outlet: 'sidePanel',
        component: AccountNotesPanel,
      },
      {
        path: 'help',
        outlet: 'sidePanel',
        component: AccountHelpPanel,
      },
    ],
  },
  {
    path: 'lesson-06-redirects-wildcards',
    component: Lesson06RedirectsWildcards,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: RedirectDemoDashboard,
      },
      {
        path: 'reports',
        component: RedirectDemoReports,
      },
      {
        path: 'old-reports',
        pathMatch: 'full',
        redirectTo: 'reports',
      },
      {
        path: '**',
        component: RedirectDemoNotFound,
      },
    ],
  },
  {
    path: 'lesson-07-programmatic-navigation',
    component: Lesson07ProgrammaticNavigation,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inbox',
      },
      {
        path: 'inbox',
        component: NavigationInboxPanel,
      },
      {
        path: 'archive',
        component: NavigationArchivePanel,
      },
    ],
  },
  {
    path: 'lesson-08-route-guards',
    component: Lesson08RouteGuards,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'public',
      },
      {
        path: 'public',
        component: GuardPublicPanel,
      },
      {
        path: 'admin',
        canActivate: [adminAccessGuard],
        component: GuardAdminPanel,
        data: {
          requiredRole: 'Admin',
        },
      },
      {
        path: 'access-denied',
        component: GuardDeniedPanel,
      },
    ],
  },
  {
    path: 'lesson-09-route-resolvers',
    pathMatch: 'full',
    redirectTo: 'lesson-09-route-resolvers/project-101',
  },
  {
    path: 'lesson-09-route-resolvers/:projectId',
    component: Lesson09RouteResolvers,
    resolve: {
      project: projectResolver,
    },
  },
  {
    path: 'lesson-10-can-deactivate',
    component: Lesson10CanDeactivate,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'editor',
      },
      {
        path: 'editor',
        component: CanDeactivateEditorPanel,
        canDeactivate: [pendingChangesGuard],
      },
      {
        path: 'preview',
        component: CanDeactivatePreviewPanel,
      },
    ],
  },
  {
    path: 'lesson-11-route-data',
    component: Lesson11RouteData,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        title: 'Routes Lesson 11 - Dashboard',
        component: RouteDataPanel,
        data: {
          page: {
            badge: 'Workspace overview',
            breadcrumb: 'Workspace / Dashboard',
            featureArea: 'Operations',
            helpText: 'Dashboard metadata is useful for overview routes and landing panels.',
            pageLabel: 'Dashboard',
            requiredRole: 'Workspace Reader',
          },
        },
      },
      {
        path: 'billing',
        title: 'Routes Lesson 11 - Billing',
        component: RouteDataPanel,
        data: {
          page: {
            badge: 'Billing area',
            breadcrumb: 'Workspace / Billing',
            featureArea: 'Finance',
            helpText: 'Billing metadata can drive page labels, breadcrumbs, and role hints.',
            pageLabel: 'Billing',
            requiredRole: 'Billing Admin',
          },
        },
      },
      {
        path: 'audit',
        title: 'Routes Lesson 11 - Audit',
        component: RouteDataPanel,
        data: {
          page: {
            badge: 'Audit tools',
            breadcrumb: 'Workspace / Audit',
            featureArea: 'Compliance',
            helpText: 'Audit metadata is route-owned information that the component can display consistently.',
            pageLabel: 'Audit Log',
            requiredRole: 'Compliance Reviewer',
          },
        },
      },
    ],
  },
  {
    path: 'lesson-12-lazy-routes',
    component: Lesson12LazyRoutes,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./lesson-12-lazy-routes/lazy-admin.routes').then(
            (m) => m.lazyAdminRoutes,
          ),
      },
    ],
  },
  {
    path: 'lesson-13-can-match',
    component: Lesson13CanMatch,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'public',
      },
      {
        path: 'public',
        component: CanMatchPublicPanel,
      },
      {
        path: 'protected',
        canMatch: [protectedFeatureCanMatchGuard],
        data: {
          requiredRole: 'Protected Feature',
        },
        loadChildren: () =>
          import('./lesson-13-can-match/restricted-feature.routes').then(
            (m) => m.restrictedFeatureRoutes,
          ),
      },
      {
        path: 'access-denied',
        component: CanMatchDeniedPanel,
      },
    ],
  },
  {
    path: 'lesson-14-router-events',
    component: Lesson14RouterEvents,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: RouterEventsHomePanel,
      },
      {
        path: 'report',
        canActivate: [routerEventsAccessGuard],
        component: RouterEventsReportPanel,
        data: {
          requiredRole: 'Reporter',
        },
      },
      {
        path: 'profile/:profileId',
        component: RouterEventsProfilePanel,
        resolve: {
          profile: routerEventsProfileResolver,
        },
      },
      {
        path: 'access-denied',
        component: RouterEventsDeniedPanel,
      },
    ],
  },
  {
    path: 'lesson-15-route-metadata-shell',
    component: Lesson15RouteMetadataShell,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        title: 'Routes Lesson 15 - Workspace Overview',
        component: MetadataOverviewPanel,
        data: {
          shell: {
            analyticsName: 'workspace_overview_viewed',
            breadcrumb: ['Workspace', 'Overview'],
            helpText: 'Overview metadata keeps the shell focused on workspace health.',
            layout: 'summary',
            section: 'Workspace',
          },
        },
      },
      {
        path: 'billing',
        title: 'Routes Lesson 15 - Billing Center',
        component: MetadataBillingPanel,
        data: {
          shell: {
            analyticsName: 'billing_center_viewed',
            breadcrumb: ['Workspace', 'Finance', 'Billing'],
            helpText: 'Billing metadata can drive finance breadcrumbs and analytics names.',
            layout: 'finance',
            section: 'Finance',
          },
        },
      },
      {
        path: 'settings',
        title: 'Routes Lesson 15 - Workspace Settings',
        component: MetadataSettingsPanel,
        data: {
          shell: {
            analyticsName: 'workspace_settings_viewed',
            breadcrumb: ['Workspace', 'Administration', 'Settings'],
            helpText: 'Settings metadata tells the shell this route belongs to administration.',
            layout: 'admin',
            section: 'Administration',
          },
        },
      },
    ],
  },
  {
    path: 'lesson-16-route-providers',
    component: Lesson16RouteProviders,
    providers: [RouteProvidersWorkspaceStore],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        title: 'Routes Lesson 16 - Route Providers Overview',
        component: RouteProvidersOverviewPanel,
      },
      {
        path: 'activity',
        title: 'Routes Lesson 16 - Route Providers Activity',
        component: RouteProvidersActivityPanel,
      },
      {
        path: 'settings',
        title: 'Routes Lesson 16 - Route Providers Settings',
        component: RouteProvidersSettingsPanel,
      },
    ],
  },
  {
    path: 'lesson-17-preloading-lazy-routes',
    component: Lesson17PreloadingLazyRoutes,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        title: 'Routes Lesson 17 - Preloading Overview',
        component: PreloadingOverviewPanel,
      },
      {
        path: 'reports',
        title: 'Routes Lesson 17 - Preloaded Reports',
        data: {
          preload: true,
        },
        loadChildren: () =>
          import('./lesson-17-preloading-lazy-routes/preloaded-reports.routes').then(
            (m) => m.preloadedReportsRoutes,
          ),
      },
    ],
  },
  {
    path: 'lesson-18-component-input-binding',
    pathMatch: 'full',
    redirectTo: 'lesson-18-component-input-binding/workspace-101',
  },
  {
    path: 'lesson-18-component-input-binding/:workspaceId',
    title: 'Routes Lesson 18 - Component Input Binding',
    component: Lesson18ComponentInputBinding,
    data: {
      accessLevel: 'Workspace Reader',
    },
    resolve: {
      workspace: componentInputWorkspaceResolver,
    },
  },
  {
    path: 'lesson-19-run-guards-resolvers',
    pathMatch: 'full',
    redirectTo: 'lesson-19-run-guards-resolvers/default/sales-report',
  },
  {
    path: 'lesson-19-run-guards-resolvers/default/:reportId',
    title: 'Routes Lesson 19 - Default Resolver Reruns',
    component: Lesson19RunGuardsResolvers,
    data: {
      strategyLabel: 'Default params-change policy',
    },
    resolve: {
      report: reportResolver,
    },
  },
  {
    path: 'lesson-19-run-guards-resolvers/query-aware/:reportId',
    title: 'Routes Lesson 19 - Query-Aware Resolver Reruns',
    component: Lesson19RunGuardsResolvers,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    data: {
      strategyLabel: 'paramsOrQueryParamsChange policy',
    },
    resolve: {
      report: reportResolver,
    },
  },
  {
    path: 'lesson-20-programmatic-resolver-rerun',
    pathMatch: 'full',
    redirectTo: 'lesson-20-programmatic-resolver-rerun/ticket-101',
  },
  {
    path: 'lesson-20-programmatic-resolver-rerun/:ticketId',
    title: 'Routes Lesson 20 - Programmatic Resolver Rerun',
    component: Lesson20ProgrammaticResolverRerun,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      ticket: supportTicketResolver,
    },
  },
  {
    path: 'lesson-21-componentless-parent',
    component: Lesson21ComponentlessParent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'workspace/acme/overview',
      },
      {
        path: 'workspace/:workspaceId',
        data: {
          featureArea: 'Workspace Administration',
          requiredRole: 'Workspace Manager',
        },
        children: [
          {
            path: 'overview',
            title: 'Routes Lesson 21 - Componentless Overview',
            component: ComponentlessOverviewPanel,
          },
          {
            path: 'settings',
            title: 'Routes Lesson 21 - Componentless Settings',
            component: ComponentlessSettingsPanel,
          },
        ],
      },
    ],
  },
];
