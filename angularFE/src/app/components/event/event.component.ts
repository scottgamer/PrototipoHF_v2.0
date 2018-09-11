import { Component, OnInit, TemplateRef, Input } from '@angular/core';

//modules
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

//dynamic routing using ids in url
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

//classes
import { Event } from '../../models/event-model';
//services
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event',
  providers: [EventService],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event:Event;

  modalRef: BsModalRef;
  message: string;

  constructor(private modalService: BsModalService, 
              private eventService:EventService,
              private route: ActivatedRoute,
              private location: Location
            ) { }

  ngOnInit() {
    this.getEvent();
  }

  //get event by id
  getEvent(): void {
    // static image of the route information
    const id = +this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(id)
      .subscribe(event => this.event = event);
  }

  saveEventModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  
  confirm(){
    this.modalRef.hide();
  }

}
