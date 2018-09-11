import { Component, OnInit } from '@angular/core';

//classes
import { Event } from '../../models/event-model';
//services
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  providers: [EventService],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events:Event[];

  constructor(private eventService:EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents()
        .subscribe(events => this.events = events);
  }



}
