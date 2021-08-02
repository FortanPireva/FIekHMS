import httpService from "./httpService";
const authToken = "AUTHTHOKEN";
class Auth {
  constructor() {
    this.authenticated = false;
  }

  init() {
    var token = localStorage.getItem(authToken);
    if (!token) {
      this.authenticated = false;
      return;
    }
  }
  login(cb) {
    this.authenticated = true;
  }
  logout(cb) {
    this.authenticated = false;
  }

  authenticated() {}
}
