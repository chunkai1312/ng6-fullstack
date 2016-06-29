import angular from 'angular';
import services from './services/services';
import components from './components/components';

export default angular.module('app.common', [
  services.name,
  components.name,
]);
