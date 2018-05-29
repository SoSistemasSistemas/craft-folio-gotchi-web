/* global angular */

import as from './alert.service';
import emss from './emotionsMachineState.service';

class CommandProcessorService {
  constructor(emotionsMachineStateService) {
    this.emotionsMachineStateService = emotionsMachineStateService;
  }

  process(actualState, command) {
    return this.emotionsMachineStateService.next(actualState, command);
  }
}

CommandProcessorService.$inject = ['emotionsMachineStateService'];

export default angular.module('services.commandProcessor', [as, emss])
  .service('commandProcessorService', CommandProcessorService)
  .name;
