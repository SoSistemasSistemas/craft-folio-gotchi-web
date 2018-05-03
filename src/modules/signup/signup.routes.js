import signupTemplate from './signup.template.html';

export default function routes($stateProvider) {
  $stateProvider
    .state('signup', {
      url: '/signup',
      template: signupTemplate,
      controller: 'SignupController',
      controllerAs: 'signup',
    });
}

routes.$inject = ['$stateProvider'];