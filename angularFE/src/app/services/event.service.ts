import { Injectable } from '@angular/core';

//import classes
import { Event } from '../models/event-model';
import { EVENTS } from '../components/events/events-mock';

import { Observable} from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class EventService {

  constructor() { }

  getEvents(): Observable<Event[]> {
    console.log('Event service loaded');
    return of(EVENTS);
  }

  getEvent(id: number): Observable<Event> {
    // TODO: send the message _after_ fetching the hero
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(EVENTS.find(event => event.id === id));
  }

}
