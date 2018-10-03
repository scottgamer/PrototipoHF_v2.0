import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Config } from '../components/global-config/config';

@Injectable()
export class CategoryService {

  config: Config;
  localhost: string;
  headers: Headers;


  constructor(private http: Http) {
    this.config = new Config();
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.localhost = this.config.getLocalhostURI();
  }

  getUri() {
    console.log(this.localhost);
  }

  /**Post Methods */
  /************************************************************************************************************** */

  /**Get Methods */

  getCategories() {
    return this.http.get(this.localhost + 'categories/getall', { headers: this.headers })
      .map(res => res.json());
  }

  getCategory(id) {
    return this.http.get(this.localhost + 'categories/getone/' + id, { headers: this.headers })
      .map(res => res.json());
  }

  /************************************************************************************************************** */

  /**Other Methods */
  /************************************************************************************************************** */



}
