import headBarTemplate from './header-bar.html';
import './header-bar.css';

class HeadBarController {
  /* @ngInject */
  constructor($mdSidenav) {
    this.$mdSidenav = $mdSidenav;
  }

  toggleNavDrawer() {
    this.$mdSidenav('nav').toggle();
  }
}

export default {
  transclude: true,
  bindings: { pageTitle: '@', backButton: '<', onBackButtonClick: '&' },
  template: headBarTemplate,
  controller: HeadBarController,
};
