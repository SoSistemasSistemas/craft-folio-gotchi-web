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
  constructor($q, $http, worldService) {
    this.$q = $q;
    this.$http = $http;
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
}

AuthService.$inject = ['$q', '$http', 'worldService'];

export default angular.module('services.auth', [ws])
  .service('authService', AuthService)
  .name;
