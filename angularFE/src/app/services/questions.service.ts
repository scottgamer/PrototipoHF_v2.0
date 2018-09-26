import { Injectable } from '@angular/core';

//import classes
import { Question } from '../models/questions-model';

import { Observable} from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class QuestionsService {

  constructor() { }

  /* getQuestions(): Observable<Question[]> {
    console.log('Questions service loaded');
    return of(QUESTIONS);
  }

  getQuestion(id: number): Observable<Question> {
    return of(QUESTIONS.find(question => question.id === id));
  } */


}
