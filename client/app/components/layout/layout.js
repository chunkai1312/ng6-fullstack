import angular from 'angular';
import ngComponentRouter from 'ngcomponentrouter';
import layoutComponent from './layout.component';
import Home from './home/home';
import About from './about/about';

export default angular.module('app.components.layout', [
  Home.name,
  About.name,
])
.component('mainLayout', layoutComponent);
