export default class HomeController {

  constructor() {
    this.skyTextures = [
      'https://storage.googleapis.com/sss-cfg-widgets/sky/sky_1.jpg',
      'https://storage.googleapis.com/sss-cfg-widgets/sky/sky_2.jpg',
    ];
    this.groundTextures = [
      'https://storage.googleapis.com/sss-cfg-widgets/ground/grass.jpg',
      'https://storage.googleapis.com/sss-cfg-widgets/ground/rock.png',
      'https://storage.googleapis.com/sss-cfg-widgets/ground/sand.jpg',
    ];
  }

  openWidgetConfiguration() {
    document.getElementById("mySidenav").style.width = "500px";
  };
  
  closeWidgetConfiguration() {
    document.getElementById("mySidenav").style.width = "0";
  };
}
