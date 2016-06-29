import './nav-menu.css';

const navMenuTemplate = `
  <md-list>
    <div ng-transclude></div>
  </md-list>
`;

class NavMenuController {
  /* @ngInject */
  constructor() { }
}

export default {
  transclude: true,
  bindings: {},
  template: navMenuTemplate,
  controller: NavMenuController,
};

