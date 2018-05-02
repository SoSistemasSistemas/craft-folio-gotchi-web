import angular from 'angular';

/**
 * The idea is, in the future, get assets dinamycally from Google Cloud Storage.
 * That's the reason of this Service: abstract this interface for better mantainability.
 */
class AssetsService {
  getSkyTextures() {
    return [
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/sky/sky_1.jpg',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/sky/sky_2.jpg',
    ];
  }

  getGroundTextures() {
    return [
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/ground/grass.jpg',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/ground/rock.png',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/ground/sand.jpg',
    ];
  }

  getOutdoorImages() {
    return [
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/outdoor/cefetmg.jpg',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/outdoor/github.png',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/outdoor/google.jpg',
    ];
  }

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
