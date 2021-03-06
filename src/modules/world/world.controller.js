/* eslint-env browser */
/* global socket, env */

function isValidURL(url) {
  try {
    return new URL(url);
  } catch (error) {
    return false;
  }
}

export default class WorldController {
  constructor(
    alertService, assetsService, commandProcessorService, avatarMovementService, webPushService,
    speechRecognitionService, userService, authService, worldService, world, avatars,
  ) {
    this.alertService = alertService;
    this.assetsService = assetsService;
    this.commandProcessorService = commandProcessorService;
    this.speechRecognitionService = speechRecognitionService;
    this.avatarMovementService = avatarMovementService;
    this.webPushService = webPushService;
    this.userService = userService;
    this.authService = authService;
    this.worldService = worldService;
    this.world = world;

    this.inputOutdoor = {};

    this.avatars = this.formatAvatars(avatars);

    this.skyTextures = this.world.widgets.skyTextures;
    this.sky = this.world.widgets.skyTextures.find(texture => texture.active).url;
    this.groundTextures = this.world.widgets.groundTextures;
    this.ground = this.groundTextures.find(texture => texture.active).url;
    this.avatar = this.avatars.find(avatar => avatar.active);

    this.assets = assetsService.getGeneralAssets();
    this.emotions = assetsService.getEmotions();

    this.colorPickerOptions = {
      swatchOnly: true,
      format: 'hex',
    };

    this.user = JSON.parse(localStorage.getItem('cfg-auth') || '{}');
    delete this.user.token;

    this.loggedAvatars = [];
    this.handleLoggedAvatarsRendering();

    if (!localStorage.getItem('cfg-web-push-token-generated') &&
        env.NODE_ENV === 'development') {
      this.webPushService
        .collectToken()
        .then(() => localStorage.setItem('cfg-web-push-token-generated', '{}'));
    }
  }

  handleLoggedAvatarsRendering() {
    const room = this.world.owner.username;

    this.loggedAvatars.push(this.avatarMovementService.register(this.user, room));
    this.loggedAvatars[0].attachKeyboardControls();

    if (this.user.username !== this.world.owner.username) {
      this.loggedAvatars.push(this.avatarMovementService.register(this.world.owner, room));
    }

    socket.emit('join-room', { room: this.world.owner.username, user: this.user });

    socket.on('joined-room', ({ user }) => {
      const avatar = this.loggedAvatars.find(a => a.user.username === user.username);

      if (!avatar) {
        this.loggedAvatars.push(this.avatarMovementService.register(user, room));
      }
    });

    socket.on('jumped', (username) => {
      const avatar = this.loggedAvatars.find(a => a.user.username === username);

      if (avatar) {
        avatar.jump();
      }
    });

    socket.on('moved', ({ username, newPosition }) => {
      const avatar = this.loggedAvatars.find(a => a.user.username === username);

      if (avatar && avatar.user.username !== this.user.username) {
        avatar.updatePosition(newPosition);
      }
    });
  }

  signOut() {
    this.authService.signOut();
  }

  formatAvatars(avatarsUrls) {
    const { avatarUrl } = this.world.owner;

    /* eslint-disable-next-line */
    return avatarsUrls.map(url => ({
      url,
      active: (avatarUrl || avatarsUrls[0]) === url,
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
    const { world } = this;
    this.rollback = JSON.stringify(world);

    document.getElementById('mySidenav').classList.toggle('sidenav-open');
  }

  closeWidgetConfiguration(rollbackWidgetConfigs) {
    if (rollbackWidgetConfigs) {
      this.world = JSON.parse(this.rollback);

      this.sky = this.world.widgets.skyTextures.find(texture => texture.active).url;
      this.ground = this.world.widgets.groundTextures.find(texture => texture.active).url;
      this.avatar.url = this.world.owner.avatarUrl;

      const myAvatar = this.loggedAvatars.find(a => a.user.username === this.user.username);
      myAvatar.user.avatarUrl = this.avatar.url;
    }

    document.getElementById('mySidenav').classList.toggle('sidenav-open');
  }

  askToCloseWidgetConfiguration() {
    const title = 'Atenção';
    const message = 'As alterações realizadas no seu mundo serão perdidas, caso não as salve. \
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
    const avatarImage = document.querySelectorAll('#avatarCarousel .active img')[0];
    const previousIndex = parseInt(avatarImage.attributes[2].value, 10);
    const nextIndex =
      this.getChangedBackgroundWidgetIndex(previousIndex, direction, this.avatars.length);

    this.avatar = this.avatars[nextIndex];

    const myAvatar = this.loggedAvatars.find(a => a.user.username === this.user.username);
    myAvatar.user.avatarUrl = this.avatar.url;

    this.world.owner.avatarUrl = this.avatar.url;
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
    const { alertService, world } = this;
    const { outdoor } = world.widgets;

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
        this.world.widgets.outdoor = outdoor.filter(cont => cont !== content);
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
    const { commandProcessorService, avatar } = this;

    avatar.state = commandProcessorService.process(avatar.state, command);
    this.consoleInput = '';
  }

  notificateVisitors() {
    const { alertService } = this;
    alertService.show({ title: '', message: 'Funcionalidade ainda não implementada!' });
  }

  showSignPlaque() {
    const { alertService, world } = this;
    const { signPlaque } = world && world.widgets || {};

    if (signPlaque && signPlaque.text) {
      alertService.show({ title: '', message: signPlaque.text });
    }
  }

  save() {
    const {
      alertService, userService, worldService, world, closeWidgetConfiguration,
    } = this;
    const { widgets } = world;
    const { username, avatarUrl } = world.owner;

    const title = 'Yaay :)';
    const message = 'Suas configurações foram salvas com sucesso!';

    closeWidgetConfiguration();

    worldService.updateWidgets(username, widgets)
      .then(() => userService.updateAvatar(username, avatarUrl))
      .then(() => alertService.success({ title, message }));
  }
}

WorldController.$inject = ['alertService', 'assetsService', 'commandProcessorService', 'avatarMovementService', 'webPushService', 'speechRecognitionService', 'userService', 'authService', 'worldService', 'world', 'avatars'];
