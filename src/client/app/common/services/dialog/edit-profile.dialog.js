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
          <div layout="row">
            <md-input-container md-is-error="form.firstName.$invalid && form.$submitted" class="md-block" flex>
              <label>First Name</label>
              <input type="text" name="firstName" ng-model="$ctrl.profile.firstName" required>
              <div ng-messages="form.firstName.$error">
                <div ng-message="required">This is required.</div>
              </div>
            </md-input-container>
            <md-input-container md-is-error="form.lastName.$invalid && form.$submitted" class="md-block" flex>
              <label>Last Name</label>
              <input type="text" name="lastName" ng-model="$ctrl.profile.lastName" required>
              <div ng-messages="form.lastName.$error">
                <div ng-message="required">This is required.</div>
              </div>
            </md-input-container>
          </div>
          <md-input-container class="md-block">
            <label>Email</label>
            <input type="text" name="email" ng-model="$ctrl.profile.email" disabled>
          </md-input-container>
          <md-input-container md-is-error="form.phone.$invalid && form.$submitted" class="md-block">
            <label>Phone</label>
            <input type="text" name="phone" ng-model="$ctrl.profile.phone" ng-pattern="/^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]+[-\s\.]?[0-9]+[-\s\.]?[0-9]+$/">
            <div ng-messages="form.phone.$error">
              <div ng-message="pattern">Please enter a valid phone number.</div>
            </div>
          </md-input-container>
          <md-input-container md-is-error="form.mobile.$invalid && form.$submitted" class="md-block">
            <label>Mobile</label>
            <input type="text" name="mobile" ng-model="$ctrl.profile.mobile" ng-pattern="/^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]+[-\s\.]?[0-9]+[-\s\.]?[0-9]+$/">
            <div ng-messages="form.mobile.$error">
              <div ng-message="pattern">Please enter a valid phone number.</div>
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
    this.title = 'Edit Profile';
  }

  hide(form) {
    if (form.$invalid) return;
    this.$mdDialog.hide(this.profile);
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
