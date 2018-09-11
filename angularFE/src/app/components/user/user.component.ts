import { Component, OnInit, Output, TemplateRef, Input } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

//dynamic routing using ids in url
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

//classes
 import { User } from '../../models/user-model';

 //services
 import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  providers:[UserService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user:User;

  modalRef: BsModalRef;

  lorem: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
    ' Eius temporibus veniam sed autem dolorem eligendi' +
    'iure quo repellendus itaque adipisci voluptatibus odio quod,' +
    ' repellat corrupti quae perspiciatis accusamus.';

  userActions: string [];

  constructor(private modalService: BsModalService,
              private userService:UserService,
              private activatedRoute:ActivatedRoute,
              private location:Location) {}

  ngOnInit() {
    this.getUserData();  
    this.getUserActions();
  }

  getUserData():void{
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => this.user = user);
  }

  getUserActions():void{
    this.userActions = [
      'Aplicaciones descargadas',
      'Preguntas realizadas',
      'Eventos guardados'
    ];
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



