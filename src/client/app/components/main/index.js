import angular from 'angular';
import Home from './home';
import About from './about';
import Admin from './admin';
import Settings from './settings';
import MainComponent from './main.component';

export default angular
  .module('app.components.main', [Home, About, Admin, Settings])
  .component('mainLayout', MainComponent)
  .name;
