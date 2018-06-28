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
  constructor(user, room) {
    this.user = user;
    this.room = room;
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

  updatePosition(newPosition) {
    this.htmlComponent().style.left = newPosition;
  }

  attachKeyboardControls() {
    window.addEventListener('keydown', (evt) => {
      switch (evt.keyCode) {
        case KEYBOARD_KEY_CODES.LEFT:
          this.move(-MOVEMENT_SIZE);
          socket.emit('moved', {
            username: this.user.username,
            room: this.room,
            newPosition: this.htmlComponent().style.left,
          });
          break;
        case KEYBOARD_KEY_CODES.RIGHT:
          this.move(MOVEMENT_SIZE);
          socket.emit('moved', {
            username: this.user.username,
            room: this.room,
            newPosition: this.htmlComponent().style.left,
          });
          break;
        case KEYBOARD_KEY_CODES.SPACE:
        case KEYBOARD_KEY_CODES.UP:
          this.jump();
          socket.emit('jumped', { username: this.user.username, room: this.room });
          break;
        default: break;
      }
    });
  }
}

class AvatarMovementService {
  register(user, room) {
    return new Avatar(user, room);
  }
}

AvatarMovementService.$inject = [];

export default angular.module('services.avatarMovement', [])
  .service('avatarMovementService', AvatarMovementService)
  .name;
