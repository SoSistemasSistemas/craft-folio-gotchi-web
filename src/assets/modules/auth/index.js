import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routing from './auth.routes';
import AuthController from './auth.controller';

export default angular.module('app.auth', [uiRouter])
  .config(routing)
  .controller('AuthController', AuthController)
  .name;
