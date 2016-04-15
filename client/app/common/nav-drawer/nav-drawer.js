import angular from 'angular';
import navDrawerComponent from './nav-drawer.component.js';

export default angular.module('app.common.navDrawer', [])
  .component('navDrawer', navDrawerComponent);
