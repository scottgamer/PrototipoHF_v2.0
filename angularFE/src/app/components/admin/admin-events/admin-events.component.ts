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

  filesToUpload: Array<File> = [];
  logoToUpload: File;
  posterToUpload: File;

  filesPath: string[] = [];

  modalRef: BsModalRef;

  constructor(private eventService: EventService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.initEvent();
    this.getEvents();
  }

  initEvent() {
    this.event = new Event();
  }

  getEvents() {
    this.eventService.getEvents()
      .subscribe(events => {
        this.events = this.getActualPath(events);
        return true;
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
  };

  onSubmitEvent() {
    const formData: any = new FormData();
    const poster: File = this.posterToUpload;
    const logo: File = this.logoToUpload;

    formData.append("uploads[]", logo[0]);
    formData.append("uploads[]", poster[0]);

    // console.log('form data variable : ' + formData.getAll('uploads[]'));

    this.eventService.postImages(formData)
      .subscribe(files => {
        files.forEach((file, index) => {
          this.filesPath.push(file.path);
        });

        let event = {
          name: this.event.name,
          date: this.event.date,
          organizedBy: this.event.organizedBy,
          organizerImg: this.filesPath[0],
          description: this.event.description,
          img: this.filesPath[1],
        };

        this.eventService.postEvent(event)
          .subscribe(data => {
            console.log(data);
            return true;
          }, err => {
            throw err;
          });
      })
  }

  posterChangeEvent(fileInput: any) {
    this.posterToUpload = <File>fileInput.target.files;
  }

  logoChangeEvent(fileInput: any) {
    this.logoToUpload = <File>fileInput.target.files;
  }

  addNewEvent(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  closeAllModals() {
    for (let i = 1; i <= this.modalService.getModalsCount(); i++) {
      this.modalService.hide(i);
    }
    location.reload();
  }

  modalConfirm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

}
