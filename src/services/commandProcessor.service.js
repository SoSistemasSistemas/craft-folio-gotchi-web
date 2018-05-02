/* global angular */

import as from './alert.service';
import emss from './emotionsMachineState.service';

class CommandProcessorService {
  constructor(alertService, emotionsMachineStateService) {
    this.alertService = alertService;
    this.emotionsMachineStateService = emotionsMachineStateService;
  }

  process(actualState, command) {
    const { emotionsMachineStateService, alertService } = this;
    const states = emotionsMachineStateService.getStates();
    const isEmotionCommand =
      states.some(state => state.actionsIn.includes(command) || state.actionsOut.includes(command));

    if (!isEmotionCommand) {
      return alertService.error({
        title: 'Oops...',
        message: `Comando '${command}' não reconhecido.`,
      });
    }

    return emotionsMachineStateService.next(actualState, command);
  }
}

CommandProcessorService.$inject = ['alertService', 'emotionsMachineStateService'];

export default angular.module('services.commandProcessor', [as, emss])
  .service('commandProcessorService', CommandProcessorService)
  .name;
