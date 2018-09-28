import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { EventService } from '../../../services/event.service';

import { Event } from '../../../models/event-model';

@Component({
  selector: 'app-admin-events',
  providers: [EventService],
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

  events: Event[];
  event: Event;

  modalRef: BsModalRef;

  constructor(private eventService: EventService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.initEvent();
    this.getEvents();
  }

  initEvent(){
    this.event = new Event();
  }

  getEvents() {
    this.eventService.getEvents()
      .subscribe(event => {
        this.events = event;
        console.log(this.events);
        return true;
      }, err => {
        throw err;
        return false;
      });
  }

  onSubmitEvent() {
    let event = {
      name: this.event.name,
      date: this.event.date,
      organizedBy: this.event.organizedBy,
      organizerImg: this.event.organizerImg,
      description: this.event.description,
      img: this.event.img,
    };

    console.log(event);
  }

  addNewEvent(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  closeAllModals() {
    for (let i = 1; i <= this.modalService.getModalsCount(); i++) {
      this.modalService.hide(i);
    }
  }

  modalConfirm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

}
