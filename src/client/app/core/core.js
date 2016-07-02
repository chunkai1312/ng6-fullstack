// angular modules
import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngComponentRouter from 'ngcomponentrouter';
import ngCookies from 'angular-cookies';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import ngResource from 'angular-resource';

// third-party modules
import ngLoadingBar from 'angular-loading-bar';
import ngMaterialDataTable from 'angular-material-data-table';
import ngToastr from 'angular-toastr';

// styles
import 'angular-material/angular-material.css';
import 'angular-material-data-table/dist/md-data-table.min.css';
import 'angular-loading-bar/build/loading-bar.css';
import 'angular-toastr/dist/angular-toastr.css';

// material design icons
import mdi from '../../assets/mdi.svg';

export default angular.module('app.core', [
  ngAnimate,
  ngAria,
  ngComponentRouter,
  ngCookies,
  ngMaterial,
  ngMessages,
  ngResource,
  ngMaterialDataTable,
  ngLoadingBar,
  ngToastr,
])
.config(($locationProvider, $mdIconProvider) => {
  'ngInject';

  if (process.env.NODE_ENV !== 'development') {
    $locationProvider.html5Mode(true);
  } else {
    $locationProvider.hashPrefix('!');
  }

  $mdIconProvider.defaultIconSet(mdi);
});
