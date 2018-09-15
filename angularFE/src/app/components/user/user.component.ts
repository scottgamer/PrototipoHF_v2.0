import { Component, OnInit, Output, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

//classes
import { User } from '../../models/user-model';

//services
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  providers: [UserService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  modalRef: BsModalRef;

  lorem: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
    ' Eius temporibus veniam sed autem dolorem eligendi' +
    'iure quo repellendus itaque adipisci voluptatibus odio quod,' +
    ' repellat corrupti quae perspiciatis accusamus.';

  userActions: string[];

  constructor(private modalService: BsModalService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getProfile();
    this.getUserActions();
  }

  getProfile() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
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

  saveUserData() {
    const user = {
      fullName: this.user.fullName,
      email:this.user.email,
      password:this.user.password
    };

    this.authService.updateUser(user).subscribe(data=>{
      if(data){
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



