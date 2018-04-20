import angular from 'angular';
import uiRouter from 'angular-ui-router';

import './auth.style.scss';

import routing from './auth.routes';
import AuthController from './auth.controller';
import authService from '../../services/auth.service';

export default angular.module('app.auth', [uiRouter, authService])
  .config(routing)
  .controller('AuthController', AuthController)
  .name;
