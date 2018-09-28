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

  getGenres(): void {
    this.genres = ['Masculino', 'Femenino', 'Otro'];
  }

  editInfo(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

}
