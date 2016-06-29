import angular from 'angular';
import loginComponent from './login.component';

export default angular.module('app.components.login', [])
  .component('login', loginComponent);
