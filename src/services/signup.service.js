import angular from 'angular';

class SignupService {
  constructor($q) {
    this.$q = $q;
  }

  signup() {
    return this.$q(resolve => resolve(this));
  }
}

export default angular.module('services.signup', [])
  .service('signupService', SignupService)
  .name;

SignupService.$inject = ['$q'];