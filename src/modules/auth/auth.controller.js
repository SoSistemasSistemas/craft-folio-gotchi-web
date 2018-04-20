export default class AuthController {
  constructor($location) {
    this.$location = $location;

    this.username = 'luisnascimento';
    this.password = '12345';
  }

  login() {
    this.$location.path('/home');
  }
}

AuthController.$inject = ['$location'];
