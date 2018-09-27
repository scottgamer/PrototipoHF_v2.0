import { Component, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

//classes
import { User } from '../../models/user-model';
import { Application } from '../../models/application-model';
import { Event } from '../../models/event-model';

//services
import { AuthService } from '../../services/auth.service';
import { Question } from '../../models/questions-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  downloadedApps: Application[] = [];
  savedEvents: Event[] = [];
  questionsMade: Question[] = [];

  modalRef: BsModalRef;

  userActions: string[];

  

  constructor(private modalService: BsModalService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.getProfile();
    this.getUserActions();
  }

  getProfile() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.getDownloadedApps(this.user);
      this.getSavedEvents(this.user);
      this.getQuestionsMade(this.user);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  getDownloadedApps(user) {
    for (let i = 0; i < user.downloadedApps.length; i++) {
      let appId = user.downloadedApps[i];
      this.authService.getUserDownloadedApp(appId)
        .subscribe(app => {
          this.downloadedApps.push(app);
        });
    }
  }

  getSavedEvents(user) {
    for (let i = 0; i < user.savedEvents.length; i++) {
      let eventId = user.savedEvents[i];
      this.authService.getUserSavedEvent(eventId).subscribe(event => {
        this.savedEvents.push(event);
      });
    }
  }

  getQuestionsMade(user) {
    for (let i = 0; i < user.questionsMade.length; i++) {
      let questionId = user.questionsMade[i];
      this.authService.getUserQuestionsMade(questionId).subscribe(question => {
        this.questionsMade.push(question);
        console.log(this.questionsMade);
      });
    }
  }

  getUserActions(): void {
    this.userActions = [
      'Aplicaciones descargadas',
      'Preguntas realizadas',
      'Eventos guardados'
    ];
  }

  saveUserData() {
    const user = {
      id: this.user._id,
      fullName: this.user.fullName,
      password: this.user.password,
      birthday: this.user.birthday,
      genre: this.user.genre,
      nationality: this.user.nationality,
      bio: this.user.bio
    };

    this.authService.updateUser(user).subscribe(data => {
      if (data) {
        console.log('Data sent');
        return true;
      }
    });
  }

  editInfo(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    // this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    console.log('abre modal');
  }

}



