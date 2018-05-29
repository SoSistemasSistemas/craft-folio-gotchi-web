/* eslint-env browser */

function isValidURL(url) {
  try {
    return new URL(url);
  } catch (error) {
    return false;
  }
}

export default class WorldController {
  constructor(
    widgetService, alertService, assetsService, commandProcessorService,
    speechRecognitionService, world,
  ) {
    this.widgetService = widgetService;
    this.alertService = alertService;
    this.assetsService = assetsService;
    this.commandProcessorService = commandProcessorService;
    this.speechRecognitionService = speechRecognitionService;
    this.world = world;

    this.inputOutdoor = {};

    this.widgetConfigs = widgetService.getAll() || {};

    this.avatars = this.getAvatars();

    this.sky = this.world.widgets.skyTextures.find(texture => texture.active).url;
    this.groundTextures = this.world.widgets.groundTextures;
    this.ground = this.groundTextures.find(texture => texture.active).url;
    this.widgetConfigs.avatar = this.avatars.find(avatar => avatar.active);

    this.assets = assetsService.getGeneralAssets();
    this.emotions = assetsService.getEmotions();

    this.colorPickerOptions = {
      swatchOnly: true,
      format: 'hex',
    };

    this.registerAvatarMovementEvents();
  }

  registerAvatarMovementEvents() {
    const avatarEl = document.getElementById('avatar');

    function move(size) {
      const position =
        Math.abs(parseInt(avatarEl.style.left || 0, 10)) + (avatarEl.offsetWidth || 0);
      if (position + Math.abs(size) < window.innerWidth ||
          (parseInt(avatarEl.style.left, 10) / size < 0)) {
        avatarEl.style.left = avatarEl.style.left ?
          `${parseInt(avatarEl.style.left, 10) + size}px` :
          `${size}px`;
      }
    }

    function jump() {
      avatarEl.classList.add('jump');
      setTimeout(() => {
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
        case 38:
          jump();
          break;
        default: break;
      }
    }

    window.addEventListener('keydown', moveSelection);
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
    const { console } = this.world.widgets || {};

    return {
      'background-color': `#${console.backgroundColor}`,
      height: `${console.height}px`,
    };
  }

  getConsoleInputStyle() {
    const { console } = this.world.widgets || {};

    return {
      'caret-color': `#${console.textColor}`,
      color: `#${console.textColor}`,
    };
  }

  openWidgetConfiguration() {
    this.rollbackWidgetConfigs = Object.assign({}, this.widgetConfigs);

    document.getElementById('mySidenav').classList.toggle('sidenav-open');
  }

  closeWidgetConfiguration(rollbackWidgetConfigs) {
    if (rollbackWidgetConfigs) {
      this.widgetConfigs = this.rollbackWidgetConfigs;
    }

    document.getElementById('mySidenav').classList.toggle('sidenav-open');
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
    const { skyTextures } = this.world.widgets;
    const skyImage = document.querySelectorAll('#skyCarousel .active img')[0];
    const previousIndex = parseInt(skyImage.attributes[2].value, 10);
    const nextIndex =
      this.getChangedBackgroundWidgetIndex(previousIndex, direction, skyTextures.length);

    this.sky = skyTextures[nextIndex].url;

    const { sky } = this;
    this.world.widgets.skyTextures = skyTextures.map(({ url }) => ({ url, active: url === sky }));
  }

  changeGround(direction) {
    const { groundTextures } = this.world.widgets;
    const groundImage = document.querySelectorAll('#groundCarousel .active img')[0];
    const previousIndex = parseInt(groundImage.attributes[2].value, 10);
    const nextIndex =
      this.getChangedBackgroundWidgetIndex(previousIndex, direction, groundTextures.length);

    this.ground = groundTextures[nextIndex].url;

    const { ground } = this;

    this.world.widgets.groundTextures =
      groundTextures.map(({ url }) => ({ url, active: url === ground }));
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
    const { inputOutdoor, alertService, world } = this;
    const { url, clickAction } = inputOutdoor;
    const { outdoor } = world.widgets;

    if (!isValidURL(url)) {
      const title = 'Oops...';
      const message =
        'A URL da imagem informada não é válida. Favor corrigir e tente novamente';

      return alertService.error({ title, message });
    }

    if (!isValidURL(clickAction)) {
      const title = 'Oops...';
      const message =
        'A URL de redirecionamento informada não é válida. Favor corrigir e tente novamente';

      return alertService.error({ title, message });
    }

    return outdoor.push(inputOutdoor);
  }

  removeOutdoorContent(content) {
    const { alertService, widgetConfigs } = this;

    const title = 'Atenção';
    const message = 'Tem certeza de que deseja excluir esse conteúdo?';
    const primaryButtonText = 'Sim, excluir';
    const secondaryButtonText = 'Deixa pra lá';
    const dangerMode = true;

    alertService
      .confirm({
        title, message, dangerMode, primaryButtonText, secondaryButtonText,
      })
      /* eslint-disable-next-line */
      .then(() => {
        widgetConfigs.outdoor = widgetConfigs.outdoor.filter(cont => cont !== content);
      });
  }

  listenToCommand() {
    this.speechRecognitionService.listen()
      .then((event) => {
        if (event && event.results && event.results[0] && event.results[0][0]) {
          const command = event.results[0][0].transcript;
          if (command) {
            this.processCommand(command.toLowerCase());
          }
        }
      });
  }

  processCommand(command) {
    const { commandProcessorService, widgetConfigs } = this;
    const { avatar } = widgetConfigs;

    avatar.state = commandProcessorService.process(avatar.state, command);
    this.consoleInput = '';
  }

  showSignPlaque() {
    const { alertService, world } = this;
    const { signPlaque } = world && world.widgets || {};

    if (signPlaque && signPlaque.text) {
      alertService.show({ title: '', message: signPlaque.text });
    }
  }

  saveWidgetConfigs() {
    const title = 'Yaay :)';
    const message = 'Suas configurações de Widgets foram salvas com sucesso!';

    this.closeWidgetConfiguration();
    // this.widgetService.upsertBulk(this.widgetConfigs);
    console.log(this.world);
    this.alertService.success({ title, message });
  }
}

WorldController.$inject = ['widgetService', 'alertService', 'assetsService', 'commandProcessorService', 'speechRecognitionService', 'world'];
