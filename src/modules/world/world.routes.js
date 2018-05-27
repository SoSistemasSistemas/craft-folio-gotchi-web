import worldTemplate from './world.template.html';

export default function routes($stateProvider) {
  $stateProvider
    .state('world', {
      url: '/worlds',
      template: worldTemplate,
      controller: 'WorldController',
      controllerAs: 'world',
    });
}

routes.$inject = ['$stateProvider'];
