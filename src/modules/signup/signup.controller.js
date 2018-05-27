export default class SignupController {
  constructor($location, signupService) {
    this.$location = $location;
    this.signupService = signupService;
  }

  signup() {
    const { username, password, confirmPassword } = this;

    this.signupService
      .signup({ username, password, confirmPassword })
      .then(() => this.$location.path('/home'));
  }
}

SignupController.$inject = ['$location', 'signupService'];
