import angular from 'angular';
import NavMenuComponent from './nav-menu.component';
import NavMenuItemComponent from './nav-menu-item.component';

export default angular
  .module('app.common.components.navMenu', [])
  .component('navMenu', NavMenuComponent)
  .component('navMenuItem', NavMenuItemComponent)
  .name;
