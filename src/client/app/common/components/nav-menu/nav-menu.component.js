import './nav-menu.css';

const navMenuTemplate = `
  <md-list>
    <div ng-transclude="item"></div>
  </md-list>
`;

class NavMenuController {
  /* @ngInject */
  constructor() { }
}

export default {
  transclude: { item: 'navMenuItem' },
  bindings: {},
  template: navMenuTemplate,
  controller: NavMenuController,
};
