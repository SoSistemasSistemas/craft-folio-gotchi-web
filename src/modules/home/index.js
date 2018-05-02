import angular from 'angular';
import uiRouter from 'angular-ui-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery';
import 'tinycolor2';
import { name as colorpicker } from 'angularjs-color-picker/dist/angularjs-color-picker.min';
import 'angularjs-color-picker/dist/angularjs-color-picker.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './home.style.scss';

import routing from './home.routes';
import HomeController from './home.controller';
import widgetService from '../../services/widget.service';
import alertService from '../../services/alert.service';
import assetsService from '../../services/assets.service';
import commandProcessorService from '../../services/commandProcessor.service';

export default angular
  .module('app.home', [uiRouter, colorpicker, widgetService, alertService, assetsService, commandProcessorService])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;
