import loginTemplate from './login.html';
import logoSrc from '../../../assets/images/angular-logo.svg';
import './login.css';

class LoginController {
  /* @ngInject */
  constructor(auth, toastr) {
    this.auth = auth;
    this.toastr = toastr;
  }

  $onInit() {
    this.user = {};
    this.logoSrc = logoSrc;
  }

  login(form) {
    if (form.$invalid) return;
    this.auth.login(this.user)
      .then(() => this.$router.navigate(['Main']))
      .catch(err => this.toastr.error('Invalid Login', err));
  }

  authenticate(provider) {
    this.auth.authenticate(provider);
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
