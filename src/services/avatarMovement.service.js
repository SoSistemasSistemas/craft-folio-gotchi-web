/* eslint no-underscore-dangle: "off" */
/* global angular, socket, document, window */

const MOVEMENT_SIZE = 10;

const KEYBOARD_KEY_CODES = {
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
};

class Avatar {
  constructor(user) {
    this.user = user;
    this._htmlComponent = undefined;
    this.htmlComponent = () => {
      this._htmlComponent = this._htmlComponent || document.getElementById(`avatar-${user.username}`);
      return this._htmlComponent;
    };
  }

  move(size) {
    const leftWidth = Math.abs(parseInt(this.htmlComponent().style.left || 0, 10));
    const offsetWidth = Math.abs(parseInt(this.htmlComponent().offsetWidth || 0, 10));

    const position = leftWidth + offsetWidth;

    if ((position + Math.abs(size) < window.innerWidth) ||
        (parseInt(this.htmlComponent().style.left, 10) / size < 0)) {
      this.htmlComponent().style.left = this.htmlComponent().style.left ?
        `${parseInt(this.htmlComponent().style.left, 10) + size}px` :
        `${size}px`;
    }
  }

  jump() {
    this.htmlComponent().classList.add('jump');

    setTimeout(() => {
      this.htmlComponent().classList.remove('jump');
    }, 1000);
  }

  attachKeyboardControls() {
    window.addEventListener('keydown', (evt) => {
      switch (evt.keyCode) {
        case KEYBOARD_KEY_CODES.LEFT:
          this.move(-MOVEMENT_SIZE);
          break;
        case KEYBOARD_KEY_CODES.RIGHT:
          this.move(MOVEMENT_SIZE);
          break;
        case KEYBOARD_KEY_CODES.SPACE:
        case KEYBOARD_KEY_CODES.UP:
          this.jump();
          // socket.emit('jumped', { username: this.user.username });
          break;
        default: break;
      }
    });
  }
}

class AvatarMovementService {
  register(user) {
    return new Avatar(user);
  }
}

AvatarMovementService.$inject = [];

export default angular.module('services.avatarMovement', [])
  .service('avatarMovementService', AvatarMovementService)
  .name;
