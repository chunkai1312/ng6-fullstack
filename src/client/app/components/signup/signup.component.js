import './signup.css';
import logo from '../../../assets/images/angular-logo.svg';

const signupTemplate = `
  <div layout="row" layout-fill class="signup" layout-align="center center" layout-padding>
    <div layout="column" layout-padding flex>
      <form name="form" ng-submit="$ctrl.signUp(form)" novalidate>
        <div layout="row" layout-padding>
          <div flex-offset-gt-sm="33" flex-gt-sm="33" flex>
            <div layout="row" layout-align="center center">
              <img class="logo" src="${logo}" alt="Logo">
            </div>
            <div layout="row">
              <md-input-container md-is-error="form.firstName.$invalid && form.$submitted" class="md-block" flex>
                <input type="text" name="firstName" ng-model="$ctrl.user.firstName" placeholder="First Name" required>
                <div ng-messages="form.firstName.$error">
                  <div ng-message="required">This is required.</div>
                </div>
              </md-input-container>
              <md-input-container md-is-error="form.lastName.$invalid && form.$submitted" class="md-block" flex>
                <input type="text" name="lastName" ng-model="$ctrl.user.lastName" placeholder="Last Name" required>
                <div ng-messages="form.lastName.$error">
                  <div ng-message="required">This is required.</div>
                </div>
              </md-input-container>
            </div>
            <md-input-container md-is-error="form.email.$invalid && form.$submitted" class="md-block">
              <input type="email" name="email" ng-model="$ctrl.user.email" placeholder="Email" required>
              <div ng-messages="form.email.$error">
                <div ng-message-exp="['required', 'email']">Please enter a valid email address.</div>
              </div>
            </md-input-container>
            <md-input-container md-is-error="form.password.$invalid && form.$submitted" class="md-block">
              <input type="password" name="password" ng-model="$ctrl.user.password" placeholder="Password" required>
              <div ng-messages="form.password.$error">
                <div ng-message="required">This is required.</div>
              </div>
            </md-input-container>
            <md-input-container md-is-error="form.confirmPassword.$invalid && form.$submitted" class="md-block">
              <input type="password" name="confirmPassword" ng-model="$ctrl.user.confirmPassword" compare-to="$ctrl.user.password" placeholder="Confirm Password" required>
              <div ng-messages="form.confirmPassword.$error">
                <div ng-message-exp="['required', 'compareTo']">Please make sure your passwords match.</div>
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
  constructor(auth, toastr) {
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
