/* global env, localStorage */

import angular from 'angular';

function handleToken(response) {
  const { token } = response && response.data || {};

  if (token) {
    localStorage.setItem('cfg-auth-token', token);
  }
}

class AuthService {
  constructor($q, $http) {
    this.$q = $q;
    this.$http = $http;
  }

  login(credentials) {
    return this.$http
      .post(`${env.API_ENDPOINT}/auth/login`, credentials)
      .then(handleToken);
  }

  signup(credentials) {
    return this.$http
      .post(`${env.API_ENDPOINT}/auth`, credentials)
      .then(handleToken);
  }
}

export default angular.module('services.auth', [])
  .service('authService', AuthService)
  .name;

AuthService.$inject = ['$q', '$http'];
