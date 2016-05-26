export default {
  bindings: {
    title: '@',
  },
  template: `
    <md-toolbar layout="row" class="md-whiteframe-z2">
      <div class="md-toolbar-tools">
        <md-button aria-label="Menu" ng-click="vm.toggleNavDrawer('left')" hide-gt-sm class="md-icon-button">
          <md-icon class="material-icons">menu</md-icon>
        </md-button>
        <h1>{{vm.title}}</h1>
        <!--<span ng-transclude></span>-->
      </div>
    </md-toolbar>
  `,
  controllerAs: 'vm',
  controller($mdSidenav) {
    'ngInject';

    const vm = this;
    vm.toggleNavDrawer = (menuId) => {
      $mdSidenav(menuId).toggle();
    };
  },
};
