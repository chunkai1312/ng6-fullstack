import angular from 'angular';
import HeaderBarComponent from './header-bar.component';

export default angular
  .module('app.common.components.sidebar', [])
  .component('headerBar', HeaderBarComponent)
  .name;
