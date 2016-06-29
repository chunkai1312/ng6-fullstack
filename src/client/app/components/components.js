import angular from 'angular';
import main from './main/main';
import login from './login/login';
import signup from './signup/signup';

export default angular.module('app.components', [
  main.name,
  login.name,
  signup.name,
]);
