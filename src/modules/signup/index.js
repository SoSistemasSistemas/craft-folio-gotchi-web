import angular from 'angular';
import uiRouter from 'angular-ui-router';

import './signup.style.scss';

import routing from './signup.routes';
import SignupController from './signup.controller';
import signupService from '../../services/signup.service';

export default angular.module('app.signup', [uiRouter, signupService])
  .config(routing)
  .controller('SignupController', SignupController)
  .name;
