import angular from 'angular';
import LoggerService from './logger.service';

export default angular
  .module('app.common.services.logger', [])
  .service('logger', LoggerService)
  .name;
