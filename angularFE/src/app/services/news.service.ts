import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

//import classes
import { New } from '../models/new-model';
import { Config } from '../components/global-config/config';


@Injectable()
export class NewsService {

  config: Config;
  localhost: string;
  headers: Headers;

  constructor(private http: Http) {
    this.config = new Config();
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.localhost = this.config.getLocalhostURI();
   }

   /**Get Methods */
  getNews(): Observable<New[]> {
    return this.http.get(this.localhost + 'news/getall', { headers: this.headers }).map(res => res.json());

  }

  getNew(id): Observable<New> {
    return this.http.get(this.localhost + 'news/getone/' + id, { headers: this.headers }).map(res => res.json());
  }

  /**************************************************************************************************************** */
}
