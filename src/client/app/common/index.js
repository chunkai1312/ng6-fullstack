import angular from 'angular';
import Components from './components';
import Directives from './directives';
import Services from './services';

export default angular
  .module('app.common', [Components, Directives, Services])
  .name;
