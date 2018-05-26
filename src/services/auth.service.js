/* global env */

import angular from 'angular';

class AuthService {
  constructor($q, $http) {
    this.$q = $q;
    this.$http = $http;
  }

  login(credentials) {
    return this.$http.post(`${env.API_ENDPOINT}/auth/login`, credentials);
  }

  signup() {

  }
}

export default angular.module('services.auth', [])
  .service('authService', AuthService)
  .name;

AuthService.$inject = ['$q', '$http'];
