/* eslint-env browser */
/* global env */

import 'bootstrap/dist/css/bootstrap.css';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import io from 'socket.io-client';

import routing from '../../configs/routes.config';
import intercepting from '../../configs/interceptors.config';

import authModule from '../auth';
import signupModule from '../signup';
import landingModule from '../landing';
import worldModule from '../world';

window.socket = io(`${env.API_ENDPOINT}`);

angular.module('app', [uiRouter, authModule, landingModule, worldModule, signupModule])
  .config(routing)
  .config(intercepting);
