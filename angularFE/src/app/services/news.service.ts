import { Injectable } from '@angular/core';

//import classes
import { New } from '../models/new-model';
import { NEWS } from '../components/news/news-mock';

import { Observable} from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class NewsService {

  constructor() { }

  getNews(): Observable<New[]> {
    console.log('News service loaded');
    return of(NEWS);
  }

  getNew(id: number): Observable<New> {
    return of(NEWS.find(neew => neew.id === id));
  }

}
