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
        <md-card>
          <md-card-content>
            <md-toolbar class="md-table-toolbar md-default">
              <div class="md-toolbar-tools">
                <span>Change Password</span>
                <span flex></span>
                <md-button class="md-icon-button" aria-label="Change Password" ng-click="$ctrl.changePassword($event)">
                  <md-icon md-svg-icon="lock"></md-icon>
                  <md-tooltip md-direction="bottom">Change Password</md-tooltip>
                </md-button>
              </div>
            </md-toolbar>
          </md-card-content>          
        </md-card>        
        <md-card>
          <md-card-content>
            <md-toolbar class="md-table-toolbar md-default">
              <div class="md-toolbar-tools">
                <span>Delete Account</span>
                <span flex></span>
                <md-button class="md-icon-button" aria-label="Delete" ng-click="$ctrl.delete($event)">
                  <md-icon md-svg-icon="delete"></md-icon>
                  <md-tooltip md-direction="bottom">Delete</md-tooltip>
                </md-button>
              </div>
            </md-toolbar>
          </md-card-content>
        </md-card>
        <md-card>
          <md-card-content>
            <md-toolbar class="md-table-toolbar md-default">
              <div class="md-toolbar-tools">
                <span>Linked Accounts</span>
              </div>
            </md-toolbar>
            <md-list ng-repeat="linkedAccount in $ctrl.linkedAccounts track by $index">
              <md-list-item>
                <md-icon md-svg-icon="{{ linkedAccount.icon }}"></md-icon>
                <span>{{ linkedAccount.text }}</span>
                <span flex></span>
                <md-icon class="md-secondary" md-svg-icon="link" ng-click="$ctrl.linkAccount(linkedAccount.provider)" aria-label="Link" ng-if="!linkedAccount.linked"></md-icon>
                <md-icon class="md-secondary" md-svg-icon="link-off" ng-click="$ctrl.unlinkAccount(linkedAccount.provider)" aria-label="Unlink" ng-if="linkedAccount.linked"></md-icon>
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
        { icon: 'account', field: 'Name', value: user.profile.name },
        { icon: 'email', field: 'Email', value: user.email },
        { icon: 'phone', field: 'Phone', value: user.profile.phone },
        { icon: 'cellphone', field: 'Mobile', value: user.profile.mobile },
      ];
      this.linkedAccounts = [
        {
          provider: 'google',
          icon: 'google-plus',
          text: `${(user.google) ? 'Unlink' : 'Link'} your Google account`,
          linked: (user.google) ? true : false,
        },
        {
          provider: 'facebook',
          icon: 'facebook-box',
          text: `${(user.facebook) ? 'Unlink' : 'Link'} your Facebook account`,
          linked: (user.facebook) ? true : false,
        },
      ];
    });
    this.promise = this.user.$promise;
  }

  edit($event) {
    this.dialog.openEditProfileDialog(this.user, $event)
      .then(profile => this.User.update(profile).$promise)
      .then(() => {
        this.toastr.success('Your profile has been changed.');
        this.$onInit();
      });
  }

  changePassword($event) {
    this.dialog.openChangePasswordDialog(this.auth.currentUser.id, $event)
      .then(password => this.User.changePassword(password).$promise)
      .then(() => {
        this.toastr.success('Your password has been changed.');
        this.$onInit();
      })
      .catch(err => {
        if (err && err.status === 400) {
          this.toastr.error('Incorrect Password');
        }
      });
  }

  delete($event) {
    this.dialog.openDeleteConfirmationDialog('Account', $event)
      .then(this.User.remove({ id: this.auth.currentUser.id }).$promise)
      .then(() => this.auth.logout());
  }

  linkAccount(provider) {
    this.auth.authenticate(provider);
  }
}

export default {
  require: { $settingsCtrl: '^settings' },
  bindings: { $router: '<' },
  template: accountTemplate,
  controller: AccountController,
};
