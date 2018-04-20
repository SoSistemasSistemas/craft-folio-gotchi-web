export default class AuthController {
  constructor($location, authService) {
    this.$location = $location;
    this.authService = authService;

    this.username = 'luisnascimento';
    this.password = '12345';
  }

  login() {
    this.authService.login().then(() => this.$location.path('/home'));
  }
}

AuthController.$inject = ['$location', 'authService'];
