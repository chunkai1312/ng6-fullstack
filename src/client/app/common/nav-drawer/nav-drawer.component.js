export default {
  bindings: {},
  template: `
    <md-sidenav
        class="md-whiteframe-z2"
        md-component-id="left"
        md-is-locked-open="$mdMedia('gt-md')"
        md-disable-backdrop>
      <md-toolbar class="md-whiteframe-z2">
        <h1 class="md-toolbar-tools">NG6 Full-Stack</h1>
      </md-toolbar>
      <md-content layout-padding>
        <div layout="column">
          <md-button class="md-primary" ng-link="['Home']">Home</md-button>
          <md-button class="md-primary" ng-link="['About']">About</md-button>
        </div>
      </md-content>
    </md-sidenav>
  `,
  controller() {

  },
};
