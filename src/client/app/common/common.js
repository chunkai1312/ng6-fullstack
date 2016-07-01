import angular from 'angular';
import services from './services/services';
import directives from './directives/directives';
import components from './components/components';

export default angular.module('app.common', [
  services.name,
  directives.name,
  components.name,
]);
