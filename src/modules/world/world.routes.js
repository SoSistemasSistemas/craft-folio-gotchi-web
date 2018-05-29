import worldTemplate from './world.template.html';

export default function routes($stateProvider) {
  $stateProvider
    .state('world', {
      url: '/worlds/:ownerUsername',
      template: worldTemplate,
      controller: 'WorldController',
      controllerAs: 'world',
      resolve: {
        world: ['$stateParams', 'worldService', ($stateParams, worldService) => {
          const { ownerUsername } = $stateParams;

          return worldService.getByOwnerUsername(ownerUsername);
        }],
        avatars: ['avatarService', avatarService => avatarService.all()],
      },
    });
}

routes.$inject = ['$stateProvider'];
