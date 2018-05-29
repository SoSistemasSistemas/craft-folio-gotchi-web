export default class AuthController {
  constructor($location, authService) {
    this.$location = $location;
    this.authService = authService;
  }

  login() {
    const { username, password } = this;

    this.authService
      .login({ username, password })
      .then(() => this.$location.path(`/worlds/${username}`));
  }
}

AuthController.$inject = ['$location', 'authService'];
