import { Component, OnInit, TemplateRef, Input } from '@angular/core';

//modules
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BarRatingModule } from "ngx-bar-rating";

//dynamic routing using ids in url
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

//services
import { ApplicationService } from '../../services/application.service';
import { CategoryService } from '../../services/category.service';

//classes
import { Application } from '../../models/application-model';
import { Category } from '../../models/category-model';
import { Question } from '../../models/questions-model';
import { Response } from '../../models/responses-model';

@Component({
  selector: 'app-application',
  providers: [ApplicationService],
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  application: Application;
  category: Category;
  appId: any;
  categoryId: any;

  questions: Question[];

  half1: string;
  half2: string;
  lorem: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem adipisci quod nemo ' +
    'vitae cumque sit, iusto porro! Eligendi nesciunt et amet numquam dolore voluptatem a ' +
    'maiores deleniti. Ex, cum ipsam.';

  isCollapsed = false;
  messageBtn: string;

  modalRef: BsModalRef;
  message: string;

  constructor(private modalService: BsModalService,
    private barRatingModule: BarRatingModule,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private categoryService: CategoryService,
    private location: Location) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['_id']) {
        this.appId = params['_id'];
        this.getApplication(this.appId);
      }
    });

    this.messageBtn = 'Leer más';

  }

  getApplication(id): void {
    this.applicationService.getApplication(id)
      .subscribe((app: Application) => {
        this.application = app;
        this.categoryId = this.application.category;
        this.getCategory(this.categoryId);
      });
  }

  getCategory(id): void {
    this.categoryService.getCategory(id)
      .subscribe(category => {
      this.category = category;
      });
  }

  loadQuestions(): void {
    this.questions = [{
      id: 1,
      question: this.lorem,
      date: '10/30/2018',
      author: 'User123',
      responses: [
        {
          id: 1,
          response: this.lorem,
          date: '10/30/2018',
          author: 'User456'
        },
        {
          id: 2,
          response: this.lorem,
          date: '10/30/2018',
          author: 'User789'
        },
        {
          id: 3,
          response: this.lorem,
          date: '10/30/2018',
          author: 'User789'
        }
      ]
    }];
  }

  getHalfString(): void {
    let descript = this.application.description;
    let size = descript.length / 2;
    this.half1 = descript.substr(0, size + 1);
    this.half2 = descript.substr(size + 1);
  }

  collapsed(): void {
    this.messageBtn = 'Leer menos';
  }

  expanded(): void {
    this.messageBtn = 'Leer más';
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(template: TemplateRef<any>): void {
    this.modalRef.hide();
  }

  confirmModal(): void {
    alert('Pregunta guardada!');
    this.modalRef.hide();
  }
}
