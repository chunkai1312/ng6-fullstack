import angular from 'angular';
import AccountComponent from './account.component';

export default angular
  .module('app.components.main.settings.account', [])
  .component('account', AccountComponent)
  .name;
