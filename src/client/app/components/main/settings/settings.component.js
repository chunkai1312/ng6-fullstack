import './settings.css';

export default {
  bindings: { $router: '<' },
  template: '<ng-outlet></ng-outlet>',
  $routeConfig: [
    { path: '/account', name: 'Account', component: 'account', useAsDefault: true },
  ],
  /* @ngInject */
  $canActivate: (auth) => auth.isLoggedIn(),
};
