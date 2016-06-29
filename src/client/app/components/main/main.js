import angular from 'angular';
import mainComponent from './main.component';
import Home from './home/home';

export default angular.module('app.components.main', [
  Home.name,
])
.component('mainLayout', mainComponent);
