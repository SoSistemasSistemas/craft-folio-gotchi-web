/* global angular */

import alertService from './alert.service';

const STATES = [
  {
    name: 'sleepy',
    actionsIn: ['dormir', 'cochilar', 'capotar', 'tirar uma soneca', 'apagar'],
    actionsOut: ['acordar', 'levantar'],
  },
  {
    name: 'sicky',
    actionsIn: ['adoecer', 'enjoar', 'dar pt', 'torcer pro galo'],
    actionsOut: ['medicar', 'ir ao médico', 'vacinar'],
  },
  {
    name: 'hungry',
    actionsIn: ['fome', 'sede', 'fumar maconha'],
    actionsOut: ['comer', 'rangar', 'laricar'],
  },
];

class CommandProcessorService {
  constructor(alertService){
    this.alertService = alertService;
  }

  process(actualState, command) {
    if (!STATES.some(state => state.actionsIn.includes(command) || state.actionsOut.includes(command))) {
      return this.alertService.error({
        title: 'Oops...', 
        message: `Comando '${command}' não reconhecido.`,
      });
    }

    if (actualState === 'normal') {
      const newState = (STATES.find(state => state.actionsIn.includes(command)) || {}).name;
      return newState || actualState;
    } else {
      const { actionsOut } = STATES.find(state => state.name === actualState) || {};
      return actionsOut && actionsOut.includes(command) ? 'normal' : actualState;
    }
  }
}

CommandProcessorService.$inject = ['alertService'];

export default angular.module('services.commandProcessor', [alertService])
  .service('commandProcessorService', CommandProcessorService)
  .name;
