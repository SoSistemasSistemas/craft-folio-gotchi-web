import angular from 'angular';

class AuthService {
  constructor($q) {
    this.$q = $q;
  }

  login() {
    return this.$q(resolve => resolve(this));
  }
}

export default angular.module('services.auth', [])
  .service('authService', AuthService)
  .name;

AuthService.$inject = ['$q'];
