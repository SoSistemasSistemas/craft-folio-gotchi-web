/* eslint-env browser */

import 'bootstrap/dist/css/bootstrap.css';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routing from '../../configs/routes.config';

import authModule from '../auth';

angular.module('app', [uiRouter, authModule])
  .config(routing);
