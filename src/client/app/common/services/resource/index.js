import angular from 'angular';
import UserService from './user.service';

export default angular
  .module('app.common.services.resource', [])
  .factory('User', UserService)
  .name;
