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
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event',
  providers: [EventService],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event: Event;
  eventId: string;
  userId: string;

  modalRef: BsModalRef;
  message: string;

  constructor(private modalService: BsModalService,
    private eventService: EventService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['_id']) {
        this.eventId = params['_id'];
        this.getEvent(this.eventId);
      }
    });
    this.getUserId();
  }

  getEvent(id): void {
    this.eventService.getEvent(id)
      .subscribe(event => {
        this.event = this.getActualPath(event);
      }, err => {
        throw err;
      });
  }

  getActualPath(event) {
    let pathToPoster;
    let pathToLogo;

    pathToPoster = event.img.substring(14, event.img.length);
    event.img = pathToPoster;

    pathToLogo = event.organizerImg.substring(14, event.organizerImg.length);
    event.organizerImg = pathToLogo;

    return event;
  }

  getUserId() {
    this.userId = this.authService.getUserId();
  }

  onClickAddToUserHistory() {
    let eventId = this.eventId;
    let userId = {
      user: this.userId
    };
    this.authService.addEventToUserHistory(eventId, userId)
      .subscribe(
        data => {
          console.log('success ' + data);
          return true;
        },
        err => {
          throw err;
        });
  }

  saveEventModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm() {
    this.modalRef.hide();
  }

}
