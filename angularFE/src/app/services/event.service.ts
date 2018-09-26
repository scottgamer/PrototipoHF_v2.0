import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

//import classes
import { Event } from '../models/event-model';

@Injectable()
export class EventService {

  constructor(private http: Http) { }

  getEvents(): Observable<Event[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/events/getall', { headers: headers }).map(res => res.json());

  }

  getEvent(id): Observable<Event> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/events/getone/' + id, { headers: headers }).map(res => res.json());
  }
}
