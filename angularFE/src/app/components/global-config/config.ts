export class Config {
  localhost: string;

  /* constructor(localhost) {
    this.localhost = localhost;
  } */

  constructor() {
    this.localhost = "http://192.168.100.106:3000/";
  }

  getLocalhostURI() {
    return this.localhost;
  }

  setLocalhostURI(localhost: string) {
    this.localhost = localhost;
  }
}
