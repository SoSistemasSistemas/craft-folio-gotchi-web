import angular from 'angular';

class AssetsService {
  getGeneralAssets() {
    return {
      signPlaque: 'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/plaquinha.png',
      speechBallon: 'https://storage.googleapis.com/sss-craft-folio-gotchi/avatars/speech-bubble.png',
    };
  }

  getEmotions() {
    return {
      sicky: 'https://storage.googleapis.com/sss-craft-folio-gotchi/avatars/sicky.png',
      sleepy: 'https://storage.googleapis.com/sss-craft-folio-gotchi/avatars/sleepy.jpg',
      hungry: 'https://storage.googleapis.com/sss-craft-folio-gotchi/avatars/hungry.jpeg',
    };
  }
}

export default angular.module('services.assets', [])
  .service('assetsService', AssetsService)
  .name;

AssetsService.$inject = [];
