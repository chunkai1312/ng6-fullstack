import signupTemplate from './signup.html';
import './signup.css';

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
