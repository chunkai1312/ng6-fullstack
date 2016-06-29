import './header-bar.css';

const headBarTemplate = `
  <md-toolbar layout="row" class="md-whiteframe-z2">
    <div class="md-toolbar-tools">
      <md-button class="md-icon-button" aria-label="Menu" 
          ng-click="$ctrl.toggleNavDrawer()" ng-if="!$ctrl.backButton" hide-gt-sm>
        <md-icon md-svg-icon="menu"></md-icon>
      </md-button>
      <md-button class="md-icon-button" aria-label="Back" 
          ng-click="$ctrl.onBackButtonClick()" ng-if="$ctrl.backButton">
        <md-icon md-svg-icon="keyboard-backspace"></md-icon>
        <md-tooltip md-direction="bottom">Back</md-tooltip>
      </md-button>
      <h1>{{ $ctrl.title }}</h1>
      <span flex></span>
      <span ng-transclude></span>
    </div>
  </md-toolbar>
`;

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
  bindings: { title: '@', backButton: '<', onBackButtonClick: '&' },
  template: headBarTemplate,
  controller: HeadBarController,
};
