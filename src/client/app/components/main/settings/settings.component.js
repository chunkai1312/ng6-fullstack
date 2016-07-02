import './settings.css';

const settingsTemplate = `
  <ng-outlet></ng-outlet>
`;

class SettingsController { }

export default {
  bindings: { $router: '<' },
  template: settingsTemplate,
  controller: SettingsController,
  $routeConfig: [
    { path: '/account', name: 'Account', component: 'account', useAsDefault: true },
  ],
  /* @ngInject */
  $canActivate: (auth) => auth.isLoggedIn(),
};
