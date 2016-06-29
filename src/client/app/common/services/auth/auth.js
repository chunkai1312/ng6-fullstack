import angular from 'angular';
import AuthService from './auth.service';
import AuthInterceptor from './auth-interceptor.service';

export default angular.module('app.common.services.auth', [])
  .service('auth', AuthService)
  .factory('authInterceptor', AuthInterceptor)
  .config($httpProvider => {
    'ngInject';
    $httpProvider.interceptors.push('authInterceptor');
  });
