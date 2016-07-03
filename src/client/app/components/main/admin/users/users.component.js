import './users.css';

const usersTemplate = `
  <main-page>
    <header-bar page-title="Administration"></header-bar>
    <admin-tabs selected-tab="Users"></admin-tabs>
    <md-content>
      <div layout="column">
        <md-card>
          <md-card-content>
            <md-toolbar class="md-table-toolbar md-default" ng-hide="$ctrl.selectedUsers.length">
              <div class="md-toolbar-tools">
                <span>Users</span>
              </div>
            </md-toolbar>
            <md-toolbar class="md-table-toolbar alternate" ng-show="$ctrl.selectedUsers.length">
              <div class="md-toolbar-tools">
                <span>{{ $ctrl.selectedUsers[0].profile.name }}</span>
                <span flex></span>
                <md-button class="md-icon-button" aria-label="Delete" ng-click="$ctrl.delete($event)">
                  <md-icon md-svg-icon="account-remove"></md-icon>
                  <md-tooltip md-direction="bottom">Delete</md-tooltip>
                </md-button>
              </div>
            </md-toolbar>
            <md-table-container>
              <table md-table md-row-select ng-model="$ctrl.selectedUsers" md-progress="$ctrl.promise">
                <thead md-head>
                  <tr md-row>
                    <th md-column>Name</th>
                    <th md-column>Role</th>
                    <th md-column>Email</th>
                    <th md-column>Phone</th>
                    <th md-column>Mobile</th>
                  </tr>
                </thead>
                <tbody md-body>
                  <tr md-row md-select="user" md-select-id="user.id"
                      ng-repeat="user in $ctrl.users track by user.id">
                    <td md-cell>{{ user.profile.name }}</td>
                    <td md-cell>{{ user.role }}</td>
                    <td md-cell>{{ user.email }}</td>
                    <td md-cell>{{ user.profile.phone }}</td>
                    <td md-cell>{{ user.profile.mobile }}</td>
                  </tr>
                </tbody>
              </table>
            </md-table-container>
          </md-card-content>
        </md-card>
      </div>
    </md-content>
  <main-page>
`;

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
