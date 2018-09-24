import { Component, OnInit, Output, TemplateRef } from '@angular/core';
import { Observable } from "rxjs/Rx"

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

//classes
import { User } from '../../models/user-model';

//services
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Application } from '../../models/application-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  //user$: Observable<User>;
  downloadedApps: Application[];

  modalRef: BsModalRef;

  userActions: string[];

  constructor(private modalService: BsModalService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.getProfile();
    this.getUserActions();
    //console.log(this.user);
  }

  getProfile() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      let downloadsSize = this.user.downloadedApps.length;
      console.log(downloadsSize);
      //this.getDownloadedApps(this.user);
      console.log(this.user);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  getUserActions(): void {
    this.userActions = [
      'Aplicaciones descargadas',
      'Preguntas realizadas',
      'Eventos guardados'
    ];
  }

  getDownloadedApps(user) {
    for(let i=0; i<user.downloadedApps.legth; i++){
      let appId = this.user.downloadedApps[i];
      console.log(appId);
      this.authService.getUserDownloadedApp(appId).subscribe(app => {
        this.downloadedApps.push(app);
        console.log(this.downloadedApps);
      });
    } 
    
    
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



