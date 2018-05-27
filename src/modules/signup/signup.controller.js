export default class SignupController {
  constructor($location, authService) {
    this.$location = $location;
    this.authService = authService;
  }

  signup() {
    const { username, password, confirmPassword } = this;

    this.authService
      .signup({ username, password, confirmPassword })
      .then(() => this.$location.path('/worlds'));
  }
}

SignupController.$inject = ['$location', 'authService'];
