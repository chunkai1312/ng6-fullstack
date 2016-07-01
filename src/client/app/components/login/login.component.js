import './login.css';
import logo from '../../../assets/images/angular-logo.svg';

const loginTemplate = `
  <div layout="row" layout-fill layout-align="center center" layout-padding>
    <div layout="column" layout-padding flex>
      <form name="form" ng-submit="$ctrl.login(form)" novalidate>
        <div layout="row" layout-padding>
          <div flex-offset-gt-sm="33" flex-gt-sm="33" flex>
            <div layout="row" layout-align="center center">
              <img class="logo" src="${logo}" alt="Logo">
            </div>
            <md-input-container md-no-float md-is-error="form.email.$invalid && form.$submitted" class="md-block">
              <md-icon md-svg-icon="email"></md-icon>
              <input name="email" ng-model="$ctrl.user.email" type="text" placeholder="Email" required>
              <div ng-messages="form.email.$error">
                <div ng-message-exp="['required', 'email']">Please enter a valid email address.</div>
              </div>
            </md-input-container>
            <md-input-container md-no-float md-is-error="form.password.$invalid && form.$submitted" class="md-block">
              <md-icon md-svg-icon="lock"></md-icon>
              <input name="password" ng-model="$ctrl.user.password" type="password" placeholder="Password" required>
              <div ng-messages="form.password.$error">
                <div ng-message="required">This is required.</div>
              </div>
            </md-input-container>
            <div layout="column"> 
              <md-button type="submit" class="md-raised md-primary">Login</md-button>
            </div>
            <div class="separator">or</div>
            <div layout="column"> 
              <md-button type="button" class="md-raised google">
                <md-icon md-svg-icon="google-plus" class="icon"></md-icon><span>Login with Google</span>
              </md-button>
            </div>
            <div layout="column"> 
              <md-button type="button" class="md-raised facebook">
                <md-icon md-svg-icon="facebook" class="icon"></md-icon><span>Login with Facebook</span>
              </md-button>
            </div>
            <div layout="column"> 
              <md-button type="button" ng-click="$ctrl.signup()">Don't have an account yet? Sign up</md-button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

class LoginController {
  /* @ngInject */
  constructor(auth, toastr) {
    this.auth = auth;
    this.toastr = toastr;
  }

  $onInit() {
    this.user = {};
  }

  login(form) {
    if (form.$invalid) return;

    this.auth.login(this.user)
      .then(() => this.$router.navigate(['Main']))
      .catch(err => this.toastr.error('Invalid Login', err));
  }

  loginWithFacebook() {
    this.auth.loginWithFacebook();
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  signup() {
    this.$router.navigate(['Signup']);
  }
}

export default {
  bindings: { $router: '<' },
  template: loginTemplate,
  controller: LoginController,
  /* @ngInject */
  $canActivate: (auth) => auth.skipIfLoggedIn(),
};
