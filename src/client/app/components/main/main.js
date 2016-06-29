import angular from 'angular';
import mainComponent from './main.component';
import Home from './home/home';
import About from './about/about';

export default angular.module('app.components.main', [
  Home.name,
  About.name,
])
.component('mainLayout', mainComponent);
