import './admin.css';

const adminTemplate = `
  <ng-outlet></ng-outlet>
`;

class AdminController { }

export default {
  bindings: { $router: '<' },
  template: adminTemplate,
  controller: AdminController,
  $routeConfig: [
    { path: '/users', name: 'Users', component: 'users', useAsDefault: true },
  ],
  /* @ngInject */
  // $canActivate: (auth) => auth.hasRole('admin'),
};
