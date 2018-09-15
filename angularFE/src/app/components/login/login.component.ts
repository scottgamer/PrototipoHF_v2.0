import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  providers: [ValidateService, AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    //if not all required fields filled
    if (!this.validateService.validateLogin(user)) {
      this.flashMessagesService.show('Complete todos los campos', { cssClass: 'alert-danger', timeout: 6000 });
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessagesService.show('Acabas de iniciar sesión', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/user']);
      } else {
        this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/login']);
      }
    });

  }

}
