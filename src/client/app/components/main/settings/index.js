import angular from 'angular';
import Account from './account';
import SettingsComponent from './settings.component';
import SettingsTabsComponent from './settings-tabs.component';

export default angular
  .module('app.components.main.settings', [Account])
  .component('settings', SettingsComponent)
  .component('settingsTabs', SettingsTabsComponent)
  .name;
