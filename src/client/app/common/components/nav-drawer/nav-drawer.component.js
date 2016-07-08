import navDrawerTemplate from './nav-drawer.html';
import './nav-drawer.css';

class NavDrawerController {
  /* @ngInject */
  constructor($rootRouter, $mdSidenav) {
    this.$rootRouter = $rootRouter;
    this.$mdSidenav = $mdSidenav;
  }

  goHome() {
    if (!this.$mdSidenav('nav').isLockedOpen()) this.$mdSidenav('nav').toggle();
    this.$rootRouter.navigate(['Main']);
  }
}

export default {
  transclude: true,
  bindings: { appTitle: '@', brandSrc: '@' },
  template: navDrawerTemplate,
  controller: NavDrawerController,
};
