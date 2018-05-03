export default class SignupController {
  constructor($location, signupService) {
    this.$location = $location;
    this.signupService = signupService;
  }

  signup() {
    this.signupService.signup().then(() => this.$location.path('/home'));
  }
}

SignupController.$inject = ['$location', 'signupService'];