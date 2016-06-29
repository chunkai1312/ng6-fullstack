let editProfileTemplate = `
  <md-dialog flex aria-label="{{ $ctrl.title }}" ng-cloak>
    <form name="form" ng-submit="$ctrl.hide(form)" novalidate>
      <md-toolbar class="md-whiteframe-z2">
        <div class="md-toolbar-tools">
          <h2>{{ $ctrl.title }}</h2>
          <span flex></span>
          <md-button class="md-icon-button" aria-label="close" ng-click="$ctrl.cancel()">
            <md-icon md-svg-icon="close"></md-icon>
          </md-button>
        </div>
      </md-toolbar>
      <md-dialog-content>
        <div class="md-dialog-content">
          <md-input-container md-is-error="form.currentPassword.$invalid && form.$submitted" class="md-block">
            <label>Current Password</label>
            <input type="password" name="currentPassword" ng-model="$ctrl.password.oldPassword" required>
            <div ng-messages="form.currentPassword.$error">
              <div ng-message="required">This is required.</div>
            </div>
          </md-input-container>
          <md-input-container md-is-error="form.newPassword.$invalid && form.$submitted" class="md-block">
            <label>New Password</label>
            <input type="password" name="newPassword" ng-model="$ctrl.password.newPassword" required>
            <div ng-messages="form.newPassword.$error">
              <div ng-message="required">This is required.</div>
            </div>
          </md-input-container>
          <md-input-container md-is-error="form.confirmPassword.$invalid && form.$submitted" class="md-block">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" ng-model="$ctrl.password.confirmPassword" compare-to="$ctrl.password.newPassword" required>
            <div ng-messages="form.confirmPassword.$error">
              <div ng-message-exp="['required', 'compareTo']">Please make sure your passwords match.</div>
            </div>
          </md-input-container>          
        </div>
      </md-dialog-content>
      <md-dialog-actions layout="row">
        <md-button ng-click="$ctrl.cancel()" class="md-primary">Cancel</md-button>
        <md-button type="submit" class="md-primary" style="margin-right:20px;">Save</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
`;

class EditProfileController {
  /* @ngInject */
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;
    this.title = 'Change Password';
  }

  hide(form) {
    if (form.$invalid) return;
    this.$mdDialog.hide(this.password);
  }

  cancel() {
    this.$mdDialog.cancel();
  }
}

export default {
  template: editProfileTemplate,
  controller: EditProfileController,
  controllerAs: '$ctrl',
};
