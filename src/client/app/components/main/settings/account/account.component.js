import accountTemplate from './account.html';
import './account.css';

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
