export class Config {

  localhost: string;

  constructor(localhost) {
    this.localhost = localhost;
  }

  getLocalhostURI() {
    return this.localhost;
  }

  setLocalhostURI(localhost) {
    this.localhost = localhost;
  }

}