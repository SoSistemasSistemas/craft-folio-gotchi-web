import angular from 'angular';
import uiRouter from 'angular-ui-router';

import './landing.style.scss';

import routing from './landing.routes';
import LandingController from './landing.controller';

export default angular.module('app.landing', [uiRouter])
  .config(routing)
  .controller('LandingController', LandingController)
  .name;
