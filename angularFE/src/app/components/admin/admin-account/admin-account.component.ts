import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user-model';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {

  user: User;
  genres: string[] = [];

  modalRef: BsModalRef;

  constructor(private authService: AuthService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getProfile();
    this.getGenres();
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
    }, err => {
      throw err;
    });
  }

  getGenres(): void {
    this.genres = ['Masculino', 'Femenino', 'Otro'];
  }

  editInfo(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

}
