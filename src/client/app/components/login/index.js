import angular from 'angular';
import LoginComponent from './login.component';

export default angular
  .module('app.components.login', [])
  .component('login', LoginComponent)
  .name;
