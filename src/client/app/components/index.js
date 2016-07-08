import angular from 'angular';
import Main from './main';
import Login from './login';
import Signup from './signup';

export default angular
  .module('app.components', [Main, Login, Signup])
  .name;
