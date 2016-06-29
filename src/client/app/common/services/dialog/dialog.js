import angular from 'angular';
import DialogService from './dialog.service';

export default angular.module('app.common.services.dialog', [])
  .service('dialog', DialogService);
