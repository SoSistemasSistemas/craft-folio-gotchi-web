import landingTemplate from './landing.template.html';

export default function routes($stateProvider) {
  $stateProvider
    .state('landing', {
      url: '/',
      template: landingTemplate,
      controller: 'LandingController',
      controllerAs: 'landing',
    });
}

routes.$inject = ['$stateProvider'];
