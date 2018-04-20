import authTemplate from './auth.template.html';

export default function routes($stateProvider) {
  $stateProvider
    .state('auth', {
      url: '/auth',
      template: authTemplate,
      controller: 'AuthController',
      controllerAs: 'auth',
    });
}

routes.$inject = ['$stateProvider'];
