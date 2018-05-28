/* eslint-env browser */
/* global angular, env */

class WorldService {
  constructor($http) {
    this.$http = $http;
  }

  getByOwnerUsername(username) {
    return this.$http
      .get(`${env.API_ENDPOINT}/worlds/${username}`)
      .then(({ data }) => data);
  }

  create() {
    return this.$http
      .post(`${env.API_ENDPOINT}/worlds/`)
      .then(({ data }) => data);
  }
}

WorldService.$inject = ['$http'];

export default angular.module('services.world', [])
  .service('worldService', WorldService)
  .name;
