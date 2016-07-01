import angular from 'angular';
import compareTo from './compare-to/compare-to';

export default angular.module('app.common.directives', [
  compareTo.name,
]);
