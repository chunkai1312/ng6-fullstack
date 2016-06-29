import angular from 'angular';
import logger from './logger/logger';
import exception from './exception/exception';
import auth from './auth/auth';
import resource from './resource/resource';
import dialog from './dialog/dialog';

export default angular.module('app.common.services', [
  logger.name,
  exception.name,
  auth.name,
  resource.name,
  dialog.name,
]);
