import angular from 'angular';
import <%= component %>Component from './<%= filename %>.component';

export default angular.module('<%= module %>', [])
  .component('<%= component %>', <%= component %>Component);
