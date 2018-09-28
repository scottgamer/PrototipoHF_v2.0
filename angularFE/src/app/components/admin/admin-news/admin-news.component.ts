import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NewsService } from '../../../services/news.service';


import { New } from '../../../models/new-model';

@Component({
  selector: 'app-admin-news',
  providers: [NewsService],
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit {

  news: New[];
  neww: New;

  modalRef: BsModalRef;

  constructor(private newsService: NewsService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.initNew();
    this.getNews();
  }

  initNew() {
    this.neww = new New();
  }

  getNews() {
    this.newsService.getNews()
      .subscribe(news => {
        this.news = news;
        console.log(news);
        return true;
      }, err => {
        throw err;
        return false;
      });
  }

  onSubmitNews() {
    let news = {
      title: this.neww.title,
      body: this.neww.body,
      imgs: this.neww.imgs,
    };

    console.log(news);
  }

  addNews(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  closeAllModals() {
    for (let i = 1; i <= this.modalService.getModalsCount(); i++) {
      this.modalService.hide(i);
    }
  }

  modalConfirm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

}
