/* eslint-env browser */
/* global swal */

const Position = {
  TOP_LEFT: '1',
  TOP_CENTER: '2',
  TOP_RIGHT: '3',
  CENTER: '4',
};

function getPositionStyle(position) {
  const { CENTER, TOP_CENTER, TOP_RIGHT } = Position;

  switch (position) {
    case CENTER:
      return {
        top: '0', left: '0', bottom: '0', right: '0', margin: 'auto',
      };
    case TOP_RIGHT:
      return {
        top: '0', right: '0', margin: '2% 2% auto auto',
      };
    case TOP_CENTER:
    default:
      return {
        left: '0', right: '0', margin: '2% auto',
      };
  }
}

export default class HomeController {
  constructor(widgetService) {
    this.widgetService = widgetService;

    this.widgetConfigs = widgetService.getAll() || {};
    this.widgetConfigs.welcomeBox = this.widgetConfigs.welcomeBox || this.getWelcomeBoxDefault();

    this.skyTextures = this.getSkyTextures();
    this.groundTextures = this.getGroundTextures();

    this.widgetConfigs.sky = this.skyTextures.find(texture => texture.active).url;
    this.widgetConfigs.ground = this.groundTextures.find(texture => texture.active).url;

    this.colorPickerOptions = {
      swatchOnly: true,
      format: 'hex',
    };
  }

  getWelcomeBoxDefault() {
    return {
      backgroundColor: '313A47',
      borderColor: '262B33',
      textColor: 'D3B832',
      text: 'Seja vem-vindo ao meu mundo!',
      width: 25,
      height: 13,
      position: Position.TOP_CENTER,
    };
  }

  getSkyTextures() {
    const texturesUrls = [
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/sky/sky_1.jpg',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/sky/sky_2.jpg',
    ];
    /* eslint-disable-next-line */
    return texturesUrls.map(url => {
      return {
        url,
        active: (this.widgetConfigs.sky || texturesUrls[0]) === url,
      };
    });
  }

  getGroundTextures() {
    const texturesUrls = [
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/ground/grass.jpg',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/ground/rock.png',
      'https://storage.googleapis.com/sss-craft-folio-gotchi/widgets/ground/sand.jpg',
    ];
    /* eslint-disable-next-line */
    return texturesUrls.map(url => {
      return {
        url,
        active: (this.widgetConfigs.ground || texturesUrls[0]) === url,
      };
    });
  }

  getWelcomeBoxStyle() {
    const { welcomeBox } = this.widgetConfigs;

    return Object.assign({
      'background-color': `#${welcomeBox.backgroundColor}`,
      border: `2px solid #${welcomeBox.borderColor}`,
      color: `#${welcomeBox.textColor}`,
      width: `${welcomeBox.width}%`,
      height: `${welcomeBox.height}%`,
    }, getPositionStyle(welcomeBox.position));
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

    this.widgetConfigs.sky = this.skyTextures[nextIndex].url;
  }

  changeGround(direction) {
    const groundImage = document.querySelectorAll('#groundCarousel .active img')[0];
    const previousIndex = parseInt(groundImage.attributes[2].value, 10);
    const nextIndex =
      this.getChangedBackgroundWidgetIndex(previousIndex, direction, this.groundTextures.length);

    this.widgetConfigs.ground = this.groundTextures[nextIndex].url;
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
    swal('Yaay :)', 'Suas configurações de Widgets foram salvas com sucesso!', 'success');
  }
}

HomeController.$inject = ['widgetService'];
