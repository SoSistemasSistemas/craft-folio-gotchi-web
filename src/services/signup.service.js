/* global env */

import angular from 'angular';

class SignupService {
  constructor($q, $http) {
    this.$q = $q;
    this.$http = $http;
  }

  signup(credentials) {
    return this.$http.post(`${env.API_ENDPOINT}/auth`, credentials);
  }
}

export default angular.module('services.signup', [])
  .service('signupService', SignupService)
  .name;

SignupService.$inject = ['$q', '$http'];
