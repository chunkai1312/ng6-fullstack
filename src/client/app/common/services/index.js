import angular from 'angular';
import Logger from './logger';
import Exception from './exception';
import Auth from './auth';
import Resource from './resource';
import Dialog from './dialog';

export default angular
  .module('app.common.services', [
    Logger,
    Exception,
    Auth,
    Resource,
    Dialog,
  ])
  .name;
