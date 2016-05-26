import angular from 'angular';
import navDrawer from './nav-drawer/nav-drawer.js';
import headerBar from './header-bar/header-bar.js';

export default angular.module('app.common', [
  navDrawer.name,
  headerBar.name,
]);


