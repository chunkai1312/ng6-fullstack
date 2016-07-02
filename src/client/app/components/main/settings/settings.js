import angular from 'angular';
import settingsComponent from './settings.component';
import settingsTabsComponent from './settings-tabs.component';
import Account from './account/account';

export default angular.module('app.components.main.settings', [Account.name])
  .component('settings', settingsComponent)
  .component('settingsTabs', settingsTabsComponent);
