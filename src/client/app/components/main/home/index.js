import angular from 'angular';
import HomeComponent from './home.component';

export default angular
  .module('app.components.main.home', [])
  .component('home', HomeComponent)
  .name;
