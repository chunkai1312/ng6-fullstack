import './nav-profile.css';
import userIconSrc from '../../../../assets/images/user.png';

const navProfileTemplate = `
  <div class="nav-profile" layout="column">
    <div><img src="${userIconSrc}" class="icon" alt="Icon"></div>
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
