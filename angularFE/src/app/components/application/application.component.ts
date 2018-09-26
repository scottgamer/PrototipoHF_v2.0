import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Observable } from "rxjs/Rx"

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
import { AuthService } from '../../services/auth.service';

//classes
import { Application } from '../../models/application-model';
import { Category } from '../../models/category-model';
import { Question } from '../../models/questions-model';
import { Commentary } from '../../models/commentaries-model';
import { Response } from '../../models/responses-model';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-application',
  providers: [ApplicationService],
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  application: Application;
  category: Category;
  comment: Commentary;
  commentariesArray: Commentary[] = [];
  usersIds: string[] = [];
  users: User[] = [];
  appId: any;
  categoryId: any;
  userId: any;
  questions: Question[] = [];
  question: Question;

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
    private authService: AuthService,
    private location: Location) {
  }

  ngOnInit() {
    this.initCommentObject();
    this.initQuestionObject();

    this.route.params.subscribe(params => {
      if (params['_id']) {
        this.appId = params['_id'];
        this.getApplication(this.appId);
      }
    });

    this.getUserId();
    this.messageBtn = 'Leer más';
  }

  initCommentObject() {
    this.comment = {
      user: '',
      commentary: '',
      rating: 0
    };
  }

  initQuestionObject() {
    this.question = {
      question: '',
      user: '',
      application: '',
      responses:[]
    };
  }

  getApplication(id): void {
    this.applicationService.getApplication(id)
      .subscribe((app: Application) => {
        this.application = app;
        this.categoryId = this.application.category;
        this.getCategory(this.categoryId);
        this.getComments(this.application);
        this.getQuestions(this.appId);
      });
  }

  getCategory(id): void {
    this.categoryService.getCategory(id)
      .subscribe(category => {
        this.category = category;
      });
  }

  getComments(app: Application) {
    app.commentaries.forEach(commentId => {
      this.applicationService.getComment(commentId)
        .subscribe(comment => {
          let userId = comment.user;
          this.commentariesArray.push(comment);
          this.authService.getUserById(userId)
            .subscribe(user => {
              this.users.push(user);
              this.users.forEach((username, index) => {
                this.commentariesArray[index].user = username.username;
              });
            }, err => {
              throw err;
            });
        }, err => {
          throw err;
        });
    });
  }

  getQuestions(appId) {
    this.applicationService.getQuestions(appId)
      .subscribe(questions => {
        this.questions = questions;
      }, err => { throw err; });
  }

  getUserId() {
    this.userId = this.authService.getUserId();
  }

  onRateAndComment() {
    const comment = {
      user: this.userId,
      commentary: this.comment.commentary,
      rating: this.comment.rating,
    };
    this.applicationService.postCommentAndRating(this.appId, comment)
      .subscribe(data => {
        if (!data) console.log('err');
        return true;
      });
  }

  onClickAddToUserHistory() {
    let appId = this.appId;
    let userId = {
      user: this.userId
    };
    console.log(userId);
    this.authService.addApplicationToUserHistory(appId, userId)
      .subscribe(
        data => {
          console.log('success ' + data);
          return true;
        },
        err => {
          console.log(err);
          return false;
        });
  }

  onSubmitQuestion() { 
    let question = {
      question: this.question.question,
      user: this.userId,
      application: this.appId,
      responses:[]
    };

    this.applicationService.postQuestion(question)
      .subscribe(data => {
        console.log('Success ' + data);
        return true;
      }, err => {
        throw err;
      });
  }


  /* getHalfString(): void {
    let descript = this.application.description;
    let size = descript.length / 2;
    this.half1 = descript.substr(0, size + 1);
    this.half2 = descript.substr(size + 1);
  } */

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
