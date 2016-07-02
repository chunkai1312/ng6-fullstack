import './account.css';

const accountTemplate = `
  <main-page>
    <header-bar page-title="Settings"></header-bar>
    <settings-tabs selected-tab="Account"></settings-tabs>
    <md-content>
      <div layout="column">
        <md-card>
          <md-card-content>
            <md-toolbar class="md-table-toolbar md-default">
              <div class="md-toolbar-tools">
                <span>Profile</span>
                <span flex></span>
                <md-button class="md-icon-button" aria-label="Edit" ng-click="$ctrl.edit($event)">
                  <md-icon md-svg-icon="pencil"></md-icon>
                  <md-tooltip md-direction="bottom">Edit</md-tooltip>
                </md-button>
                <md-button class="md-icon-button" aria-label="change Password" ng-click="$ctrl.changePassword($event)">
                  <md-icon md-svg-icon="lock"></md-icon>
                  <md-tooltip md-direction="bottom">Change Password</md-tooltip>
                </md-button>
              </div>
            </md-toolbar>
            <md-progress-linear md-mode="indeterminate" ng-hide="$ctrl.promise.$$state.status"></md-progress-linear>
            <md-list ng-repeat="info in $ctrl.userInfo track by $index">
              <md-list-item>
                <md-icon md-svg-icon="{{ info.icon }}"></md-icon>
                <span>{{ info.field }}</span>
                <span flex></span>
                <span>{{ info.value }}</span>
              </md-list-item>
              <md-divider ng-if="!$last"></md-divider>
            </md-list>
          </md-card-content>
        </md-card>
      </div>
    </md-content>
  <main-page>
`;

class AccountController {
  /* @ngInject */
  constructor(auth, dialog, toastr, User) {
    this.auth = auth;
    this.dialog = dialog;
    this.toastr = toastr;
    this.User = User;
  }

  $onInit() {
    this.user = this.User.get();
    this.user.$promise.then(user => {
      this.profile = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        mobile: user.mobile,
      };
      this.userInfo = [
        { icon: 'account', field: 'Name', value: user.name },
        { icon: 'email', field: 'Email', value: user.email },
        { icon: 'phone', field: 'Phone', value: user.phone },
        { icon: 'cellphone', field: 'Mobile', value: user.mobile },
      ];
    });
    this.promise = this.user.$promise;
  }

  edit($event) {
    this.dialog.openEditProfileDialog(this.profile, $event)
      .then(profile => this.User.update(profile).$promise)
      .then(res => {
        this.toastr.success('Your profile has been changed.');
        this.$onInit();
      });
  }

  changePassword($event) {
    this.dialog.openChangePasswordDialog(this.auth.currentUser.id, $event)
      .then(password => this.User.changePassword(password).$promise)
      .then(res => {
        this.toastr.success('Your password has been changed.');
        this.$onInit();
      })
      .catch(err => {
        if (err && err.status === 400) {
          this.toastr.error('Incorrect Password');
        }
      });
  }
}

export default {
  require: { $settingsCtrl: '^settings' },
  bindings: { $router: '<' },
  template: accountTemplate,
  controller: AccountController,
};
