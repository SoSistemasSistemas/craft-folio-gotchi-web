/* eslint-env browser */
/* global angular, navigator, env */

import firebase from 'firebase/app';
import 'firebase/messaging';

import us from './user.service';

const config = {
  apiKey: 'AIzaSyB4XDEcrPeHgwtPXVi1AETvHH5Ck1uHct8',
  authDomain: 'craft-folio-gotchi-207711.firebaseapp.com',
  databaseURL: 'https://craft-folio-gotchi-207711.firebaseio.com',
  projectId: 'craft-folio-gotchi-207711',
  storageBucket: '',
  messagingSenderId: '664523256006',
};

let messaging;

if (env.NODE_ENV === 'development') {
  firebase.initializeApp(config);

  messaging = firebase.messaging();
}


const registerServiceWorker = () => {
  if (!navigator || !navigator.serviceWorker) {
    throw new Error('Browser não suporta o uso de Service Workers');
  }

  return navigator.serviceWorker
    .register('/service-worker')
    .then(registration => messaging.useServiceWorker(registration));
};

class WebPushService {
  constructor(userService) {
    this.userService = userService;
  }

  collectToken() {
    return registerServiceWorker()
      .then(() => messaging.requestPermission())
      .then(() => messaging.getToken())
      .then(token => this.userService.updateTokenWebPush(token));
  }
}

WebPushService.$inject = ['userService'];

export default angular.module('services.webPush', [us])
  .service('webPushService', WebPushService)
  .name;
