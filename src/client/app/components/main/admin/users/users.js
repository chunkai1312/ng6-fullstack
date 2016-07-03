import angular from 'angular';
import usersComponent from './users.component';

export default angular.module('app.components.main.admin.users', [])
  .component('users', usersComponent);
