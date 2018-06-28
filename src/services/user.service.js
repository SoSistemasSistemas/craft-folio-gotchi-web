/* global env, localStorage */

import angular from 'angular';

class UserService {
  constructor($http) {
    this.$http = $http;
  }

  updateAvatar(username, url) {
    return this.$http
      .put(`${env.API_ENDPOINT}/users/${username}/avatar`, { url });
  }

  updateTokenWebPush(token) {
    const { username } = JSON.parse(localStorage.getItem('cfg-auth') || '{}');
    return this.$http
      .put(`${env.API_ENDPOINT}/users/${username}/tokenWebPush`, { token });
  }
}

UserService.$inject = ['$http'];

export default angular.module('services.user', [])
  .service('userService', UserService)
  .name;
