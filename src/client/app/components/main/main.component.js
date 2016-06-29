import './main.css';
import brand from '../../../assets/images/angular-logo.svg';

const mainTemplate = `
  <div layout="row" layout-fill>
    <nav-drawer title="NG6 Fullstack" brand-src="${brand}" layout="row">
      <nav-profile user="$ctrl.auth.currentUser"></nav-profile>
      <nav-menu>
        <nav-menu-item
            class="active"
            item="menuItem"
            on-item-click="$ctrl.go(menuItem)"
            ng-repeat="menuItem in $ctrl.menuItems track by $index"
            ng-if="menuItem.canAccess">
        </nav-menu-item>
      </nav-menu>
    </nav-drawer>
    <ng-outlet layout-fill flex></ng-outlet>
  </div>
`;

class MainController {
  /* @ngInject */
  constructor($mdSidenav, auth) {
    this.$mdSidenav = $mdSidenav;
    this.auth = auth;
  }

  $onInit() {
    this.menuItems = [
      // { icon: 'view-dashboard', title: 'Ads Manager', link: ['Ads'], canAccess: this.auth.hasPermission('ads') },
      // { icon: 'chart-bar', title: 'Reports', link: ['Reports'], canAccess: this.auth.hasPermission('report') },
      // { icon: 'wrench', title: 'Administration', link: ['Admin'], canAccess: this.auth.hasPermission('admin') },
      // { icon: 'settings', title: 'Settings', link: ['Settings'], canAccess: this.auth.isLoggedIn() },
      { icon: 'logout', title: 'Logout', canAccess: this.auth.isLoggedIn() },
    ];
  }

  go(item) {
    if (!this.$mdSidenav('nav').isLockedOpen()) this.$mdSidenav('nav').toggle();
    if (item.link) this.$router.navigate(item.link);
    if (item.title === 'Logout') this.auth.logout();
  }
}

export default {
  bindings: { $router: '<' },
  template: mainTemplate,
  controller: MainController,
  $routeConfig: [
    { path: '/', name: 'Home', component: 'home', useAsDefault: true },
    // { path: '/ads/...', name: 'Ads', component: 'ads' },
    // { path: '/reports/...', name: 'Reports', component: 'reports' },
    // { path: '/admin/...', name: 'Admin', component: 'admin' },
    // { path: '/settings/...', name: 'Settings', component: 'settings' },
  ],
  /* @ngInject */
  $canActivate: (auth) => auth.isLoggedIn(),
};