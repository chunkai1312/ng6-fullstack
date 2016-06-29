import './signup.css';
import logo from '../../../assets/images/angular-logo.svg';

const signupTemplate = `
  <div layout="row" layout-fill class="signup" layout-align="center center" layout-padding>
    <div layout="column" layout-padding flex>
      <form name="form" ng-submit="$ctrl.signUp(form)" novalidate>
        <div layout="row" layout-padding>
          <div flex-offset-gt-md="33" flex-gt-md="33" flex>
            <div layout="row" layout-align="center center">
              <img class="logo" src="${logo}" alt="Logo">
            </div>
            <md-input-container md-no-float md-is-error="form.name.$invalid && form.$submitted" class="md-block" flex>
              <md-icon md-svg-icon="account"></md-icon>
              <input type="text" name="name" ng-model="$ctrl.user.name" placeholder="Name" required>
              <div ng-messages="form.name.$error">
                <div ng-message="required">This is required.</div>
              </div>
            </md-input-container>
            <md-input-container md-no-float md-is-error="form.email.$invalid && form.$submitted" class="md-block">
              <md-icon md-svg-icon="email"></md-icon>
              <input type="email" name="email" ng-model="$ctrl.user.email" placeholder="Email" required>
              <div ng-messages="form.email.$error">
                <div ng-message-exp="['required', 'email']">Please enter a valid email address.</div>
              </div>
            </md-input-container>
            <md-input-container md-no-float md-is-error="form.password.$invalid && form.$submitted" class="md-block">
              <md-icon md-svg-icon="lock"></md-icon>
              <input type="password" name="password" ng-model="$ctrl.user.password" placeholder="Password" required>
              <div ng-messages="form.password.$error">
                <div ng-message="required">This is required.</div>
              </div>
            </md-input-container>
            <div layout="column"> 
              <md-button type="submit" class="md-raised md-primary">Sign Up</md-button>
            </div>
            <div layout="column"> 
              <md-button type="button" ng-click="$ctrl.login()">Already have an account? Log in now</md-button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

class SignupController {
  /* @ngInject */
  constructor($location, auth, toastr) {
    this.$location = $location;
    this.auth = auth;
    this.toastr = toastr;
  }

  $onInit() {
    this.user = {};
  }

  signup(form) {
    if (form.$invalid) return;

    this.user.code = this.$location.search().code;
    this.auth.signup(this.user)
      .then(() => this.$router.navigate(['Main']))
      .catch(err => this.toastr.error('Invalid Registration', err));
  }

  login() {
    this.$router.navigate(['Login']);
  }
}

export default {
  bindings: { $router: '<' },
  template: signupTemplate,
  controller: SignupController,
    /* @ngInject */
  $canActivate: (auth) => auth.skipIfLoggedIn(),
};
