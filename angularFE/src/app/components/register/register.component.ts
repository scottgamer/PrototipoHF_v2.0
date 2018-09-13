import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages'; 

@Component({
  selector: 'app-register',
  providers:[ValidateService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:string;
  email:string;
  password:string;

  constructor(private validaetService:ValidateService, 
              private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  submit():void{
    console.log('se envió formulario');
  }

  onRegisterSubmit(){
    const user = {
      username: this.username,
      email:this.email,
      password:this.password
    };

    //if not all required fields filled
    if(!this.validaetService.validateRegister(user)){
      //console.log('Complete todos los campos');
      this.flashMessagesService.show('Complete todos los campos', {cssClass: 'alert-danger', timeout:6000});
      return false;
    }

    if(!this.validaetService.validateEmail(user.email)){
      //console.log('Ingrese un email válido');
      this.flashMessagesService.show('Ingrese un correo válido', {cssClass: 'alert-danger', timeout:6000});
      return false;
    }
  }

}
