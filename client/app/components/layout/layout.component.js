export default {
  bindings: {},
  template: `
    <div layout="row" layout-fill>
      <nav-drawer layout="row"></nav-drawer>
      <ng-outlet layout-fill></ng-outlet>
    </div>
  `,
  controller($mdSidenav) {
    'ngInject';

    this.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };
  },
  $routeConfig: [
    { path: '/', name: 'Home', component: 'home', useAsDefault: true },
    { path: '/about', name: 'About', component: 'about' },
  ],
};




