import angular from 'angular';

class AssetsService {
  getAvatars() {
    return [
      'https://storage.googleapis.com/sss-craft-folio-gotchi/avatars/mametchi.png',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/avatars/decoratchi.png',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/avatars/knighttchi.png',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/avatars/tacttchi.png',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/avatars/yumemitchi.png',
    ];
  }

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
