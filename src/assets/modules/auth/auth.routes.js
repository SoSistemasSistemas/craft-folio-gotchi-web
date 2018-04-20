import authTemplate from './auth.template.html';

export default function routes($stateProvider) {
  $stateProvider
    .state('auth', {
      url: '/',
      template: authTemplate,
      controller: 'AuthController',
      controllerAs: 'auth',
    });
}

routes.$inject = ['$stateProvider'];
