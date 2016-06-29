import angular from 'angular';
import ngAnimate from 'angular-animate';
import toastr from 'angular-toastr';
import LoggerService from './logger.service';
import 'angular-toastr/dist/angular-toastr.css';

export default angular.module('app.common.services.logger', [ngAnimate, toastr])
  .service('logger', LoggerService);
