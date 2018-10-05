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

  events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents()
      .subscribe(events => {
        this.events = this.getActualPath(events);
      }, err => {
        throw err;
      });
  }

  getActualPath(events) {
    let pathToPoster;
    let pathToLogo;

    events.forEach((event) => {
      pathToPoster = event.img.substring(14, event.img.length);
      event.img = pathToPoster;
      pathToLogo = event.organizerImg.substring(14, event.organizerImg.length);
      event.organizerImg = pathToLogo;
    });

    return events;
  }

}
