import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages'; 

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  providers:[ValidateService, AuthService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:string;
  email:string;
  password:string;

  constructor(private validateService:ValidateService, 
              private flashMessagesService: FlashMessagesService,
              private authService:AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      username: this.username,
      email:this.email,
      password:this.password
    };

    //if not all required fields filled
    if(!this.validateService.validateRegister(user)){
      //console.log('Complete todos los campos');
      this.flashMessagesService.show('Complete todos los campos', {cssClass: 'alert-danger', timeout:4000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      //console.log('Ingrese un email válido');
      this.flashMessagesService.show('Ingrese un correo válido', {cssClass: 'alert-danger', timeout:4000});
      return false;
    }

    //register user using rest api
    this.authService.registerUser(user).subscribe(data=>{
      if(data.success){
        this.flashMessagesService.show('Acaba de registrase, ya puede iniciar sesión', {cssClass: 'alert-success', timeout:6000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessagesService.show('Hubo un error', {cssClass: 'alert-danger', timeout:6000});
        this.router.navigate(['/register']);
      }
    });

  }

}
