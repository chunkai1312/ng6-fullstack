/* @ngInject */
function AuthInterceptor($q, $cookies, $injector) {
  let auth;

  return {
    request(config) {
      config.headers = config.headers || {};
      if ($cookies.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      }
      return config;
    },
    responseError(response) {
      auth = auth || $injector.get('auth');
      if (response.status === 401) {
        auth.logout();
      }
      return $q.reject(response);
    },
  };
}

export default AuthInterceptor;
