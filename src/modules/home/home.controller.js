/* eslint-env browser */
/* global swal */

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

  closeWidgetConfiguration(rollbackWidgetConfigs) {
    if (rollbackWidgetConfigs) {
      this.widgetConfigs = this.rollbackWidgetConfigs;
    }

    document.getElementById('mySidenav').style.width = '0';
  }

  askToCloseWidgetConfiguration() {
    const title = 'Atenção';
    const message = 'As alterações realizadas nos seus Widgets serão perdidas, caso não as salve. \
                     Tem certeza de que deseja prosseguir?';

    swal(title, message, 'warning', {
      focusConfirm: false,
      buttons: {
        cancel: {
          text: 'Continuar editando',
          value: false,
          visible: true,
        },
        confirm: {
          text: 'Prosseguir',
          value: true,
          visible: true,
        },
      },
    })
      .then((proceed) => {
        if (proceed) {
          this.closeWidgetConfiguration(true);
        }
      });
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
    swal('', 'Configurações de Widgets salvas com sucesso', 'success');
  }
}

HomeController.$inject = ['widgetService'];
