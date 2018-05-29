/* global env */

import angular from 'angular';

class AvatarService {
  constructor($http) {
    this.$http = $http;
  }

  all() {
    return this.$http
      .get(`${env.API_ENDPOINT}/avatars`)
      .then(({ data }) => data);
  }
}

AvatarService.$inject = ['$http'];

export default angular.module('services.avatar', [])
  .service('avatarService', AvatarService)
  .name;
