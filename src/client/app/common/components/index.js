import angular from 'angular';
import HeaderBar from './header-bar';
import NavDrawer from './nav-drawer';
import NavProfile from './nav-profile';
import NavMenu from './nav-menu';
import MainPage from './main-page';

export default angular
  .module('app.common.components', [
    HeaderBar,
    NavDrawer,
    NavProfile,
    NavMenu,
    MainPage,
  ])
  .name;
