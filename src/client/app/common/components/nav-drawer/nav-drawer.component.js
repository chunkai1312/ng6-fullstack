import './nav-drawer.css';

const navDrawerTemplate = `
  <md-sidenav
      class="md-whiteframe-z2"
      md-component-id="nav"
      md-is-locked-open="$mdMedia('gt-sm')"
      md-disable-backdrop>
    <md-toolbar class="md-whiteframe-z2 ng-click="$ctrl.goHome()">
      <div class="md-toolbar-tools">
        <div class="brand" layout="row" layout-align="start center" ng-click="$ctrl.goHome()" flex>
          <img ng-src="{{ $ctrl.brandSrc }}" alt="Punwave">
          <span>{{ $ctrl.appTitle }}</span>
        </div>
      </div>
    </md-toolbar>
    <div ng-transclude></div>
  </md-sidenav>
`;

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
