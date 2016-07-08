import angular from 'angular';
import Core from './core';
import Common from './common';
import Components from './components';

export default angular
  .module('app', [Core, Common, Components])
  .value('$routerRootComponent', 'app')
  .component('app', {
    template: '<ng-outlet></ng-outlet>',
    $routeConfig: [
      { path: '/...', name: 'Main', component: 'mainLayout', useAsDefault: true },
      { path: '/login', name: 'Login', component: 'login' },
      { path: '/signup', name: 'Signup', component: 'signup' },
    ],
  });
