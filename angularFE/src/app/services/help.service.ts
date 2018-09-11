import { Injectable } from '@angular/core';

//import classes
import { Help } from '../models/help-model';
import { HELPS } from '../components/help/help-mock';

import { Observable} from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HelpService {

  constructor() { }

  getHelpArticles(): Observable<Help[]> {
    console.log('Help service loaded');
    return of(HELPS);
  }

  getHelpArticle(id: number): Observable<Help> {
    return of(HELPS.find(article => article.id === id));
  }

}
