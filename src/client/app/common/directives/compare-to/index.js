import angular from 'angular';
import CompareToDirective from './compare-to.directive';

export default angular
  .module('app.common.directives.compareTo', [])
  .directive('compareTo', CompareToDirective)
  .name;
