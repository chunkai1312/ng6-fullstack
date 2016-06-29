import angular from 'angular';
import headerBarComponent from './header-bar.component';

export default angular.module('app.common.components.sidebar', [])
  .component('headerBar', headerBarComponent);
