export default class AuthController {
  constructor() {
    this.username = 'luisnascimento';
    this.password = '12345';
  }

  login() {
    console.log(`Login with ${this.username} using password: ${this.password}`);
  }
}
