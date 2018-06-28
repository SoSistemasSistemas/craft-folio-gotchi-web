/* global env, localStorage */

import angular from 'angular';

import ws from './world.service';

function handleAuth(response) {
  const data = JSON.stringify(response && response.data || {});
  localStorage.setItem('cfg-auth', data);
}

class AuthService {
  constructor($q, $http, $state, worldService) {
    this.$q = $q;
    this.$http = $http;
    this.$state = $state;
    this.worldService = worldService;
  }

  login(credentials) {
    return this.$http
      .post(`${env.API_ENDPOINT}/auth/login`, credentials)
      .then(handleAuth);
  }

  signup(credentials) {
    return this.$http
      .post(`${env.API_ENDPOINT}/auth`, credentials)
      .then(handleAuth)
      .then(() => this.worldService.create());
  }

  signOut() {
    localStorage.removeItem('cfg-auth');
    return this.$state.go('auth');
  }
}

AuthService.$inject = ['$q', '$http', '$state', 'worldService'];

export default angular.module('services.auth', [ws])
  .service('authService', AuthService)
  .name;
