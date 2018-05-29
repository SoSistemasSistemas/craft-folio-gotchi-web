import angular from 'angular';
import uiRouter from 'angular-ui-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery';
import 'tinycolor2';
import { name as colorpicker } from 'angularjs-color-picker/dist/angularjs-color-picker.min';
import 'angularjs-color-picker/dist/angularjs-color-picker.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './world.style.scss';

import routing from './world.routes';
import WorldController from './world.controller';
import alertService from '../../services/alert.service';
import assetsService from '../../services/assets.service';
import avatarService from '../../services/avatar.service';
import userService from '../../services/user.service';
import worldService from '../../services/world.service';
import emotionsMachineStateService from '../../services/emotionsMachineState.service';
import commandProcessorService from '../../services/commandProcessor.service';
import speechRecognitionService from '../../services/speechRecognition.service';

export default angular
  .module('app.world', [uiRouter, colorpicker, avatarService, userService, worldService, alertService, assetsService, commandProcessorService, emotionsMachineStateService, speechRecognitionService])
  .config(routing)
  .controller('WorldController', WorldController)
  .name;
