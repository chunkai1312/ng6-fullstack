import _ from 'lodash';

const settingsTabsTemplate = `
  <md-tabs md-border-bottom md-selected="$ctrl.selectedTabIndex">
    <md-tab label="{{ tab.label }}" md-on-select="$ctrl.$settingsCtrl.$router.navigate(tab.link)"
        ng-repeat="tab in $ctrl.tabs track by $index"></md-tab>
  </md-tabs>
`;

class SettingsTabsController {
  /* @ngInject */
  constructor(auth) {
    this.auth = auth;
  }

  $onInit() {
    this.tabs = [
      { label: 'My Account', name: 'Account', link: ['Account'] },
    ];
    this.selectedTabIndex = _.findIndex(this.tabs, { name: this.selectedTab });
  }
}

export default {
  require: { $settingsCtrl: '^settings' },
  bindings: { selectedTab: '@' },
  template: settingsTabsTemplate,
  controller: SettingsTabsController,
};
