/* eslint-env browser */
/* global angular */

import emss from './emotionsMachineState.service';
import as from './alert.service';

const SpeechRecognition = window.webkitSpeechRecognition || undefined;
const SpeechGrammarList = window.webkitSpeechGrammarList || undefined;

class SpeechRecognitionService {
  constructor($q, emotionsMachineStateService, alertService) {
    this.$q = $q;
    this.emotionsMachineStateService = emotionsMachineStateService;
    this.alertService = alertService;
  }

  listen() {
    if (!SpeechRecognition || !SpeechGrammarList) {
      const title = 'Oops...';
      const message =
        'Aparentemente seu Browser ainda não suporta a funcionalidade de reconhecimento de fala.';

      this.alertService.error({ title, message });
      return this.$q(resolve => resolve());
    }

    const states = this.emotionsMachineStateService.getStates();
    const commands =
      states.reduce((result, state) => [...result, ...state.actionsIn, ...state.actionsOut], []);

    const grammar = `#JSGF V1.0; grammar commands public <command> = ${commands.join(' | ')} ;`;

    const speechGrammerList = new SpeechGrammarList();
    speechGrammerList.addFromString(grammar, 1);

    const recognition = new SpeechRecognition();
    recognition.grammars = speechGrammerList;
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    return this.$q((resolve) => {
      recognition.onresult = resolve;
    });
  }
}

SpeechRecognitionService.$inject = ['$q', 'emotionsMachineStateService', 'alertService'];

export default angular.module('services.speechRecognition', [emss, as])
  .service('speechRecognitionService', SpeechRecognitionService)
  .name;
