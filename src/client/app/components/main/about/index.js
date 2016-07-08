import angular from 'angular';
import AboutComponent from './about.component';

export default angular
  .module('app.components.main.about', [])
  .component('about', AboutComponent)
  .name;
