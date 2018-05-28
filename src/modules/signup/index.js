import angular from 'angular';
import uiRouter from 'angular-ui-router';

import './signup.style.scss';

import routing from './signup.routes';
import SignupController from './signup.controller';
import authService from '../../services/auth.service';
import worldService from '../../services/world.service';

export default angular.module('app.signup', [uiRouter, authService, worldService])
  .config(routing)
  .controller('SignupController', SignupController)
  .name;
