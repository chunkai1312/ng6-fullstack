import angular from 'angular';
import ExceptionService from './exception.service';

export default angular
  .module('app.common.services.exception', [])
  .factory('$exceptionHandler', ExceptionService)
  .name;
