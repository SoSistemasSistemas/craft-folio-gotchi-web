/* eslint-env browser */
/* global angular, env */

class WorldService {
  constructor($http) {
    this.$http = $http;
  }

  getByOwnerUsername(username) {
    return this.$http
      .get(`http://${window.location.hostname}:3000/worlds/${username}`)
      .then(({ data }) => data);
  }

  create() {
    return this.$http
      .post(`http://${window.location.hostname}:3000/worlds/`)
      .then(({ data }) => data);
  }

  updateWidgets(ownerUsername, widgets) {
    return this.$http
      .put(`http://${window.location.hostname}:3000/worlds/${ownerUsername}/widgets`, widgets);
  }
}

WorldService.$inject = ['$http'];

export default angular.module('services.world', [])
  .service('worldService', WorldService)
  .name;
