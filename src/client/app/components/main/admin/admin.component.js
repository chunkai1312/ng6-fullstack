import './admin.css';

export default {
  bindings: { $router: '<' },
  template: '<ng-outlet></ng-outlet>',
  $routeConfig: [
    { path: '/users', name: 'Users', component: 'users', useAsDefault: true },
  ],
  /* @ngInject */
  $canActivate: (auth) => auth.isAdmin(),
};
