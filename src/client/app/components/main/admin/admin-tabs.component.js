import _ from 'lodash';

const adminTabsTemplate = `
  <md-tabs md-border-bottom md-selected="$ctrl.selectedTabIndex">
    <md-tab label="{{ tab.label }}" md-on-select="$ctrl.$adminCtrl.$router.navigate(tab.link)"
        ng-repeat="tab in $ctrl.tabs track by $index"></md-tab>
  </md-tabs>
`;

class AdminTabsController {
  /* @ngInject */
  constructor(auth) {
    this.auth = auth;
  }

  $onInit() {
    this.tabs = [
      { label: 'Users', name: 'Users', link: ['Users'] },
    ];
    this.selectedTabIndex = _.findIndex(this.tabs, { name: this.selectedTab });
  }
}

export default {
  require: { $adminCtrl: '^admin' },
  bindings: { selectedTab: '@' },
  template: adminTabsTemplate,
  controller: AdminTabsController,
};
