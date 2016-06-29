import angular from 'angular';
import Core from './core/core';
import Common from './common/common';
import Components from './components/components';

angular.module('app', [
  Core.name,
  Common.name,
  Components.name,
])
.value('$routerRootComponent', 'app')
.component('app', {
  template: '<ng-outlet></ng-outlet>',
  $routeConfig: [
    { path: '/...', name: 'Main', component: 'mainLayout', useAsDefault: true },
    { path: '/login', name: 'Login', component: 'login' },
    { path: '/signup', name: 'Signup', component: 'signup' },
  ],
});
