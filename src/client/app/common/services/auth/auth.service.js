import _ from 'lodash';

class AuthService {
  /* @ngInject */
  constructor($window, $http, $cookies, $rootRouter, User) {
    this.$window = $window;
    this.$http = $http;
    this.$cookies = $cookies;
    this.$rootRouter = $rootRouter;
    this.User = User;
    this.currentUser = {};
  }

  signup(user) {
    return new Promise((reslove, reject) => {
      this.$http.post('/auth/signup', user)
        .then(res => {
          this.$cookies.put('token', res.data.token);
          reslove(res.data);
        })
        .catch(err => reject(err.data));
    });
  }

  login(user) {
    return new Promise((reslove, reject) => {
      this.$http.post('/auth/login', user)
        .then(res => {
          this.$cookies.put('token', res.data.token);
          reslove(res.data);
        })
        .catch(err => reject(err.data));
    });
  }

  authenticate(provider) {
    this.$window.location.href = `/auth/${provider}`;
  }

  logout() {
    this.$cookies.remove('token');
    this.currentUser = {};
    this.currentBusiness = {};
    this.$rootRouter.navigate(['Login']);
  }

  isLoggedIn() {
    if (!_.isEmpty(this.currentUser)) return true;
    if (this.$cookies.get('token')) {
      return this.User.get().$promise
        .then(user => {
          this.currentUser = user;
          return true;
        })
        .catch(() => false);
    }
    this.$rootRouter.navigate(['Login']);
    return false;
  }

  skipIfLoggedIn() {
    if (this.$cookies.get('token')) {
      this.$rootRouter.navigate(['Main']);
      return false;
    }
    return true;
  }

  isAdmin() {
    if (_.isEmpty(this.currentUser)) {
      return this.isLoggedIn().then(() => this.currentUser.role === 'admin');
    }
    return this.currentUser.role === 'admin';
  }

  forgotPassword(email) {
    return this.$http.post('/auth/forgotPassword', { email });
  }

  resetPassword(password, code) {
    return this.$http.post('/auth/resetPassword', { password, code });
  }
}

export default AuthService;
