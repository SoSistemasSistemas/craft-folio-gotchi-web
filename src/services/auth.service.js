/* global env, localStorage */

import angular from 'angular';

import ws from './world.service';

function handleToken(response) {
  const { token } = response && response.data || {};

  if (token) {
    localStorage.setItem('cfg-auth-token', token);
  }
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
      .then(handleToken);
  }

  signup(credentials) {
    return this.$http
      .post(`${env.API_ENDPOINT}/auth`, credentials)
      .then(handleToken)
      .then(() => this.worldService.create());
  }

  signOut() {
    localStorage.removeItem('cfg-auth-token');
    return this.$state.go('auth');
  }
}

AuthService.$inject = ['$q', '$http', '$state', 'worldService'];

export default angular.module('services.auth', [ws])
  .service('authService', AuthService)
  .name;
