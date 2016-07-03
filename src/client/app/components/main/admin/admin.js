import angular from 'angular';
import adminComponent from './admin.component';
import adminTabsComponent from './admin-tabs.component';
import Users from './users/users';

export default angular.module('app.components.main.admin', [Users.name])
  .component('admin', adminComponent)
  .component('adminTabs', adminTabsComponent);
