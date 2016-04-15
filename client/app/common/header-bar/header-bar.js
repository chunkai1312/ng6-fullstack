import angular from 'angular';
import headerBarComponent from './header-bar.component.js';

export default angular.module('app.common.sidebar', [])
  .component('headerBar', headerBarComponent);
