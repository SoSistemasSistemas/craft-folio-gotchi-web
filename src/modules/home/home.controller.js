export default class HomeController {

  constructor(widgetService) {
    this.widgetService = widgetService;

    this.widgetConfigs = widgetService.getAll() || {};

    this.skyTextures = [
      'https://storage.googleapis.com/sss-cfg-widgets/sky/sky_1.jpg',
      'https://storage.googleapis.com/sss-cfg-widgets/sky/sky_2.jpg',
    ];
    this.groundTextures = [
      'https://storage.googleapis.com/sss-cfg-widgets/ground/grass.jpg',
      'https://storage.googleapis.com/sss-cfg-widgets/ground/rock.png',
      'https://storage.googleapis.com/sss-cfg-widgets/ground/sand.jpg',
    ];

    this.widgetConfigs.sky = this.widgetConfigs.sky || this.skyTextures[0];
    this.widgetConfigs.ground = this.widgetConfigs.ground || this.groundTextures[0];
  }

  openWidgetConfiguration() {
    this.rollbackWidgetConfigs = Object.assign({}, this.widgetConfigs);

    document.getElementById("mySidenav").style.width = "500px";
  };
  
  closeWidgetConfiguration() {
    this.widgetConfigs = this.rollbackWidgetConfigs;
    document.getElementById("mySidenav").style.width = "0";
  };

  changeActiveSkyCarousel(isGoingFoward) {
    const previousIndex = parseInt(document.querySelectorAll('#skyCarousel .active img')[0].attributes[2].value);
    let nextIndex = isGoingFoward ? previousIndex + 1 : previousIndex - 1;

    if (nextIndex === this.skyTextures.length)
      nextIndex = 0;
    
    if (nextIndex === -1)
      nextIndex = this.skyTextures.length - 1;

    this.widgetConfigs.sky = this.skyTextures[nextIndex];
  }

  changeActiveGroundCarousel(isGoingFoward) {
    const previousIndex = parseInt(document.querySelectorAll('#groundCarousel .active img')[0].attributes[2].value);
    let nextIndex = isGoingFoward ? previousIndex + 1 : previousIndex - 1;

    if (nextIndex === this.groundTextures.length)
      nextIndex = 0;
    
    if (nextIndex === -1)
      nextIndex = this.groundTextures.length - 1;

    this.widgetConfigs.ground = this.groundTextures[nextIndex];
  }

  saveWidgetConfigs() {
    this.widgetService.upsertBulk(this.widgetConfigs);
    this.closeWidgetConfiguration();
  }
}

HomeController.$inject = ['widgetService'];
