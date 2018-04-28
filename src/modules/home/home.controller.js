/* eslint-env browser */

export default class HomeController {
  constructor(widgetService) {
    this.widgetService = widgetService;

    this.widgetConfigs = widgetService.getAll() || {};

    this.skyTextures = [
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/sky/sky_1.jpg',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/sky/sky_2.jpg',
    ];
    this.groundTextures = [
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/ground/grass.jpg',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/ground/rock.png',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/ground/sand.jpg',
    ];

    this.widgetConfigs.sky = this.widgetConfigs.sky || this.skyTextures[0];
    this.widgetConfigs.ground = this.widgetConfigs.ground || this.groundTextures[0];
  }

  openWidgetConfiguration() {
    this.rollbackWidgetConfigs = Object.assign({}, this.widgetConfigs);

    document.getElementById('mySidenav').style.width = '500px';
  }

  closeWidgetConfiguration() {
    this.widgetConfigs = this.rollbackWidgetConfigs;
    document.getElementById('mySidenav').style.width = '0';
  }

  changeSky(direction) {
    const skyImage = document.querySelectorAll('#skyCarousel .active img')[0];
    const previousIndex = parseInt(skyImage.attributes[2].value, 10);
    const nextIndex =
      this.getChangedBackgroundWidgetIndex(previousIndex, direction, this.skyTextures.length);

    this.widgetConfigs.sky = this.skyTextures[nextIndex];
  }

  changeGround(direction) {
    const groundImage = document.querySelectorAll('#groundCarousel .active img')[0];
    const previousIndex = parseInt(groundImage.attributes[2].value, 10);
    const nextIndex =
      this.getChangedBackgroundWidgetIndex(previousIndex, direction, this.groundTextures.length);

    this.widgetConfigs.ground = this.groundTextures[nextIndex];
  }

  getChangedBackgroundWidgetIndex(previousIndex, direction, totalBackgrounds) {
    let nextIndex = 0;

    if (direction === 'next') {
      nextIndex = previousIndex + 1;
    } else if (direction === 'prev') {
      nextIndex = previousIndex - 1;
    }

    if (nextIndex === totalBackgrounds) {
      nextIndex = 0;
    }

    if (nextIndex === -1) {
      nextIndex = totalBackgrounds - 1;
    }

    return nextIndex;
  }

  saveWidgetConfigs() {
    this.widgetService.upsertBulk(this.widgetConfigs);
    this.closeWidgetConfiguration();
  }
}

HomeController.$inject = ['widgetService'];
