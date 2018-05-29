/* global env */

import angular from 'angular';

class UserService {
  constructor($http) {
    this.$http = $http;
  }

  updateAvatar(username, url) {
    return this.$http
      .put(`${env.API_ENDPOINT}/users/${username}/avatar`, { url });
  }
}

UserService.$inject = ['$http'];

export default angular.module('services.user', [])
  .service('userService', UserService)
  .name;
