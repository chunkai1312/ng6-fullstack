import './nav-profile.css';
import user from '../../../../assets/images/user.png';

const navProfileTemplate = `
  <div class="nav-profile" layout="column">
    <div><img ng-src="${user}" class="icon" alt="Icon"></div>
    <div class="md-title"><strong>{{ $ctrl.user.name }}</strong></div>
    <div class="md-subhead">{{ $ctrl.user.email }}</div>
  </div>
`;

class NavProfileController {
  /* @ngInject */
  constructor() { }
}

export default {
  require: '^navDrawer',
  bindings: { user: '<', business: '<' },
  template: navProfileTemplate,
  controller: NavProfileController,
};

