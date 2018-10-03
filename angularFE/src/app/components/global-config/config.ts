export class Config {

  localhost: string;

  /* constructor(localhost) {
    this.localhost = localhost;
  } */

  constructor(){
    this.localhost = 'http://192.168.100.107:3000/';
  }

  getLocalhostURI() {
    return this.localhost;
  }

  setLocalhostURI(localhost) {
    this.localhost = localhost;
  }

}