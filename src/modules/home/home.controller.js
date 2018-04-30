/* eslint-env browser */

function isValidURL(url) {
  try {
    return new URL(url);
  } catch (error) {
    return false;
  }
}

export default class HomeController {
  constructor(widgetService, alertService, assetsService) {
    this.widgetService = widgetService;
    this.alertService = alertService;
    this.assetsService = assetsService;

    this.inputOutdoor = {};

    this.widgetConfigs = widgetService.getAll() || {};
    this.widgetConfigs.console = this.widgetConfigs.console || this.getConsoleDefault();
    this.widgetConfigs.outdoor = this.widgetConfigs.outdoor || this.getOutdoorDefaultContent();

    this.skyTextures = this.getSkyTextures();
    this.groundTextures = this.getGroundTextures();
    this.avatars = this.getAvatars();

    this.widgetConfigs.sky = this.skyTextures.find(texture => texture.active).url;
    this.widgetConfigs.ground = this.groundTextures.find(texture => texture.active).url;
    this.widgetConfigs.avatar = this.avatars.find(avatar => avatar.active);

    this.colorPickerOptions = {
      swatchOnly: true,
      format: 'hex',
    };

    this.registerAvatarMovementEvents();
  }

  registerAvatarMovementEvents() {

    const avatarEl = document.getElementById('avatar');

    function move(size) {
      avatarEl.style.left = avatarEl.style.left ? parseInt(avatarEl.style.left) + size + 'px' : `${size}px`;
    }

    function jump() {
      avatarEl.classList.add('jump');
      setTimeout(function() {
        avatarEl.classList.remove('jump');
      }, 1000);
    }

    function moveSelection(evt) {
      switch (evt.keyCode) {
        case 37:
          move(-10);
          break;
        case 39:
          move(10);
          break;
        case 32:
          jump();
          break;
        case 38:
          jump();
      }
    };

    window.addEventListener('keydown', moveSelection);
  }

  getConsoleDefault() {
    return {
      backgroundColor: '515151',
      textColor: 'FFEB3B',
      height: 60,
    };
  }

  getSkyTextures() {
    const texturesUrls = this.assetsService.getSkyTextures();
    /* eslint-disable-next-line */
    return texturesUrls.map(url => ({
      url,
      active: (this.widgetConfigs.sky || texturesUrls[0]) === url,
    }));
  }

  getGroundTextures() {
    const texturesUrls = this.assetsService.getGroundTextures();
    /* eslint-disable-next-line */
    return texturesUrls.map(url => ({
      url,
      active: (this.widgetConfigs.ground || texturesUrls[0]) === url,
    }));
  }

  getAvatars() {
    const { avatar } = this.widgetConfigs;
    const avatarsUrls = this.assetsService.getAvatars();
    /* eslint-disable-next-line */
    return avatarsUrls.map(url => ({
      url,
      active: (avatar && avatar.url || avatarsUrls[0]) === url,
    }));
  }

  getConsoleStyle() {
    const { console } = this.widgetConfigs;

    return {
      'background-color': `#${console.backgroundColor}`,
      height: `${console.height}px`,
    };
  }

  getConsoleInputStyle() {
    const { console } = this.widgetConfigs;

    return {
      'caret-color': `#${console.textColor}`,
      color: `#${console.textColor}`,
    };
  }

  getOutdoorDefaultContent() {
    const content = this.assetsService.getOutdoorImages().map(url => ({ url }));

    content[0].clickAction = 'http://www.cefetmg.br/';
    content[1].clickAction = 'https://github.com/SoSistemasSistemas';
    content[2].clickAction = 'https://www.google.com.br/';

    return content;
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
    const primaryButtonText = 'Prosseguir';
    const secondaryButtonText = 'Continuar editando';

    this.alertService
      .confirm({
        title, message, primaryButtonText, secondaryButtonText,
      })
      .then(() => {
        this.closeWidgetConfiguration(true);
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

  changeAvatar(direction) {
    const groundImage = document.querySelectorAll('#avatarCarousel .active img')[0];
    const previousIndex = parseInt(groundImage.attributes[2].value, 10);
    const nextIndex =
      this.getChangedBackgroundWidgetIndex(previousIndex, direction, this.avatars.length);

    this.widgetConfigs.avatar = this.avatars[nextIndex];
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

  addOutdoorContent() {
    const { inputOutdoor } = this;
    const { url, clickAction } = inputOutdoor;

    if (!isValidURL(url)) {
      const title = 'Oops...';
      const message =
        'A URL da imagem informada não é válida. Favor corrigir e tente novamente';

      return this.alertService.error({ title, message });
    }

    if (!isValidURL(clickAction)) {
      const title = 'Oops...';
      const message =
        'A URL de redirecionamento informada não é válida. Favor corrigir e tente novamente';

      return this.alertService.error({ title, message });
    }

    return this.widgetConfigs.outdoor.push(inputOutdoor);
  }

  removeOutdoorContent(content) {
    const title = 'Atenção';
    const message = 'Tem certeza de que deseja excluir esse conteúdo?';
    const primaryButtonText = 'Sim, excluir';
    const secondaryButtonText = 'Deixa pra lá';
    const dangerMode = true;

    this.alertService
      .confirm({
        title, message, dangerMode, primaryButtonText, secondaryButtonText,
      })
      /* eslint-disable-next-line */
      .then(() => {
        this.widgetConfigs.outdoor = this.widgetConfigs.outdoor.filter(cont => cont !== content);
      });
  }

  processCommand() {
    const { consoleInput } = this;

    const title = 'Oops...';
    let message;

    if (consoleInput) {
      message = `Comando '${this.consoleInput}' não reconhecido.`;
    } else {
      message = 'Não foi informado nenhum comando para ser processado.';
    }

    this.alertService.error({ title, message });
    this.consoleInput = '';
  }

  saveWidgetConfigs() {
    const title = 'Yaay :)';
    const message = 'Suas configurações de Widgets foram salvas com sucesso!';

    this.closeWidgetConfiguration();
    this.widgetService.upsertBulk(this.widgetConfigs);
    this.alertService.success({ title, message });
  }
}

HomeController.$inject = ['widgetService', 'alertService', 'assetsService'];
