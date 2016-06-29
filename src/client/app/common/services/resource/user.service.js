/* @ngInject */
function UserService($resource) {
  return $resource('/api/users/:id/:action', { id: '@id' }, {
    get: {
      method: 'GET',
      params: {
        id: 'me',
      },
      ignoreLoadingBar: true,
    },
    update: {
      method: 'PUT',
    },
    changePassword: {
      method: 'PUT',
      params: {
        action: 'password',
      },
    },
  });
}

export default UserService;
