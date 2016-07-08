import angular from 'angular';
import Users from './users';
import AdminComponent from './admin.component';
import AdminTabsComponent from './admin-tabs.component';

export default angular
  .module('app.components.main.admin', [Users])
  .component('admin', AdminComponent)
  .component('adminTabs', AdminTabsComponent)
  .name;
