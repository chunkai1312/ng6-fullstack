import usersTemplate from './users.html';
import './users.css';

class UsersController {
  /* @ngInject */
  constructor(auth, dialog, toastr, User) {
    this.auth = auth;
    this.dialog = dialog;
    this.toastr = toastr;
    this.User = User;
  }

  $onInit() {
    this.selectedUsers = [];
    this.users = this.User.query();
    this.promise = this.users.$promise;
  }

  delete($event) {
    this.dialog.openConfirmationDialog(
        `Remove ${this.selectedUsers[0].profile.name}`,
        `Are you sure you want to remove ${this.selectedUsers[0].profile.name} ?`,
        $event)
      .then(() => this.User.remove({ id: this.selectedUsers[0].id }).$promise)
      .then(() => this.$onInit());
  }
}

export default {
  bindings: { $router: '<' },
  template: usersTemplate,
  controller: UsersController,
};
