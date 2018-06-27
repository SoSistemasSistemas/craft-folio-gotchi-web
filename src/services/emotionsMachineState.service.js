/* global angular */

import as from './assets.service';

class EmotionsMachineStateService {
  constructor(assetsService, alertService) {
    this.assetsService = assetsService;
    this.alertService = alertService;
  }

  getStates() {
    const emotions = this.assetsService.getEmotions();

    return [{
      name: 'normal',
      actions: {
        dormir: 'sleepy',
        cochilar: 'sleepy',
        capotar: 'sleepy',
        apagar: 'sleepy',
        adoecer: 'sicky',
        enjoar: 'sicky',
        fome: 'hungry',
        sede: 'hungry',
      },
      url: emotions.sleepy,
    }, {
      name: 'sleepy',
      actions: {
        acordar: 'normal',
        levantar: 'normal',
      },
      url: emotions.sleepy,
    }, {
      name: 'sicky',
      actions: {
        medicar: 'normal',
        vacinar: 'normal',
      },
      url: emotions.sicky,
    }, {
      name: 'hungry',
      actions: {
        comer: 'normal',
        rangar: 'normal',
      },
      url: emotions.hungry,
    }];
  }

  next(actualState, command) {
    const states = this.getStates();

    if (!actualState) {
      actualState = states.find(s => s.name === 'normal');
    }

    if (actualState.actions[command]) {
      return states.find(s => s.name === actualState.actions[command]);
    }

    this.alertService.warning({
      title: 'Oops, comando inválido...',
      message: `Comandos disponíveis para este estado:\n ${Object.keys(actualState.actions).join(' - ')}`,
    });

    return actualState;
  }
}

EmotionsMachineStateService.$inject = ['assetsService', 'alertService'];

export default angular.module('services.emotionsMachineState', [as])
  .service('emotionsMachineStateService', EmotionsMachineStateService)
  .name;
