import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

//import classes
import { Event } from '../models/event-model';
import { Config } from '../components/global-config/config';

@Injectable()
export class EventService {

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
  getEvents(): Observable<Event[]> {
    return this.http.get(this.localhost + 'events/getall', { headers: this.headers }).map(res => res.json());

  }

  getEvent(id): Observable<Event> {
    return this.http.get(this.localhost + 'events/getone/' + id, { headers: this.headers }).map(res => res.json());
  }
  /******************************************************************************************************************* */
}
