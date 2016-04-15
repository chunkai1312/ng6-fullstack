import angular from 'angular';
import material from 'angular-material';
import ngComponentRouter from 'ngcomponentrouter';
import Common from './common/common';
import Components from './components/components';
import 'angular-material/angular-material.css';

angular.module('app', [
  material,
  ngComponentRouter,
  Common.name,
  Components.name,
])

.config(($locationProvider) => {
  'ngInject';

  $locationProvider.html5Mode(true);
})

.value('$routerRootComponent', 'app')

.component('app', {
  template: '<ng-outlet></ng-outlet>',
  $routeConfig: [
    { path: '/...', name: 'MainLayout', component: 'mainLayout', useAsDefault: true },
  ],
});
