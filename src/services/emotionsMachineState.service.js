/* global angular */

import as from './assets.service';

class EmotionsMachineStateService {
  constructor(assetsService) {
    this.assetsService = assetsService;
  }

  getStates() {
    const emotions = this.assetsService.getEmotions();

    return [
      {
        name: 'sleepy',
        actionsIn: ['dormir', 'cochilar', 'capotar', 'tirar uma soneca', 'apagar'],
        actionsOut: ['acordar', 'levantar'],
        url: emotions.sleepy,
      },
      {
        name: 'sicky',
        actionsIn: ['adoecer', 'enjoar', 'dar pt', 'torcer pro galo'],
        actionsOut: ['medicar', 'ir ao médico', 'vacinar'],
        url: emotions.sicky,
      },
      {
        name: 'hungry',
        actionsIn: ['fome', 'sede', 'fumar maconha'],
        actionsOut: ['comer', 'rangar', 'laricar'],
        url: emotions.hungry,
      },
    ];
  }

  next(actualState, command) {
    const states = this.getStates();

    if (actualState.name === 'normal') {
      const newState = states.find(state => state.actionsIn.includes(command));
      return newState || actualState;
    }

    const { actionsOut } = states.find(state => state.name === actualState.name) || {};
    return actionsOut && actionsOut.includes(command) ? { name: 'normal' } : actualState;
  }
}

EmotionsMachineStateService.$inject = ['assetsService'];

export default angular.module('services.emotionsMachineState', [as])
  .service('emotionsMachineStateService', EmotionsMachineStateService)
  .name;
