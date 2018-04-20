import homeTemplate from './home.template.html';

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      template: homeTemplate,
      controller: 'HomeController',
      controllerAs: 'home',
    });
}

routes.$inject = ['$stateProvider'];
