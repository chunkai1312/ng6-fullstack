import './nav-menu-item.css';

const navMenuItemTemplate = `
  <md-list-item ng-click="$ctrl.onItemClick($ctrl.item)">
    <md-icon md-svg-icon="{{ $ctrl.item.icon }}" aria-label="{{ $ctrl.item.title }}"></md-icon>
    <p class="md-body-2">{{ $ctrl.item.title }}</p>
  </md-list-item>
`;

class NavMenuItemController { }

export default {
  require: '^navMenu',
  bindings: { item: '<', onItemClick: '&' },
  template: navMenuItemTemplate,
  controller: NavMenuItemController,
};
