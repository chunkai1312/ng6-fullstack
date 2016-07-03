import angular from 'angular';
import mainComponent from './main.component';
import Home from './home/home';
import About from './about/about';
import Admin from './admin/admin';
import Settings from './settings/settings';

export default angular.module('app.components.main', [
  Home.name,
  About.name,
  Admin.name,
  Settings.name,
])
.component('mainLayout', mainComponent);
