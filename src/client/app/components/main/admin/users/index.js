import angular from 'angular';
import UsersComponent from './users.component';

export default angular
  .module('app.components.main.admin.users', [])
  .component('users', UsersComponent)
  .name;
