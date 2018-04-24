import angular from 'angular';
import uiRouter from 'angular-ui-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './home.style.scss';

import routing from './home.routes';
import HomeController from './home.controller';

export default angular.module('app.home', [uiRouter])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;
