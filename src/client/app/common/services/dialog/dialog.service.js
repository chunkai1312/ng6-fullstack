import angular from 'angular';
import _ from 'lodash';
import editProfileDialog from './edit-profile.dialog';
import changePasswordDialog from './change-password.dialog';

class DialogService {
  /* @ngInject */
  constructor($mdDialog, $mdMedia) {
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
  }

  openConfirmationDialog(title, message, $event) {
    let dialog = this.$mdDialog.confirm()
      .targetEvent($event)
      .title(title)
      .textContent(message)
      .ariaLabel(title)
      .ok('OK')
      .cancel('Cancel');
    return this.$mdDialog.show(dialog);
  }

  openDeleteConfirmationDialog(name, $event) {
    let dialog = this.$mdDialog.confirm()
      .targetEvent($event)
      .title(`Delete ${name}`)
      .textContent(`Are you sure you want to delete ${name} ?`)
      .ariaLabel(`Delete ${name}`)
      .ok('Delete')
      .cancel('Cancel');
    return this.$mdDialog.show(dialog);
  }

  openEditProfileDialog(profile, $event) {
    let options = {
      parent: angular.element(document.body),
      targetEvent: $event,
      locals: { profile: Object.assign({}, profile) },
      bindToController: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs'),
    };
    let dialog = Object.assign(options, editProfileDialog);
    return this.$mdDialog.show(dialog);
  }

  openChangePasswordDialog(userId, $event) {
    let options = {
      parent: angular.element(document.body),
      targetEvent: $event,
      locals: { password: Object.assign({}, { id: userId }) },
      bindToController: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs'),
    };
    let dialog = Object.assign(options, changePasswordDialog);
    return this.$mdDialog.show(dialog);
  }
}

export default DialogService;
