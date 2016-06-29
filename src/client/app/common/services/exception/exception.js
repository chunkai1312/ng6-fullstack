import angular from 'angular';
import logger from '../logger/logger';
import ExceptionService from './exception.service';

export default angular.module('app.common.services.exception', [logger.name])
  .factory('$exceptionHandler', ExceptionService);

