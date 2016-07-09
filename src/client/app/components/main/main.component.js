import mainTemplate from './main.html';
import brandSrc from '../../../assets/images/angular-logo.svg';
import './main.css';

class MainController {
  /* @ngInject */
  constructor($mdSidenav, auth) {
    this.$mdSidenav = $mdSidenav;
    this.auth = auth;
  }

  $onInit() {
    this.brandSrc = brandSrc;
    this.menuItems = [
      { icon: 'home', title: 'Home', link: ['Home'], canAccess: this.auth.isLoggedIn() },
      { icon: 'view-grid', title: 'About', link: ['About'], canAccess: this.auth.isLoggedIn() },
      { icon: 'wrench', title: 'Administration', link: ['Admin'], canAccess: this.auth.isAdmin() },
      { icon: 'settings', title: 'Settings', link: ['Settings'], canAccess: this.auth.isLoggedIn() },
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
    { path: '/about', name: 'About', component: 'about' },
    { path: '/admin/...', name: 'Admin', component: 'admin' },
    { path: '/settings/...', name: 'Settings', component: 'settings' },
  ],
  /* @ngInject */
  $canActivate: (auth) => auth.isLoggedIn(),
};
