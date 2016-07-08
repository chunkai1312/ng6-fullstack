import './nav-profile.css';

const navProfileTemplate = `
  <div class="nav-profile" layout="column">
    <div><img ng-src="./assets/images/user.png" class="icon" alt="Icon"></div>
    <div class="md-title"><strong>{{ $ctrl.user.profile.name }}</strong></div>
    <div class="md-subhead">{{ $ctrl.user.email }}</div>
  </div>
`;

class NavProfileController { }

export default {
  require: '^navDrawer',
  bindings: { user: '<' },
  template: navProfileTemplate,
  controller: NavProfileController,
};
