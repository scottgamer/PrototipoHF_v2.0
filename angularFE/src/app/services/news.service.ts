import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable} from 'rxjs';

//import classes
import { New } from '../models/new-model';


@Injectable()
export class NewsService {

  constructor(private http:Http) { }

  getNews(): Observable<New[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/news/getall', { headers: headers }).map(res => res.json());

  }

  getNew(id): Observable<New> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/news/getone/' + id, { headers: headers }).map(res => res.json());
  }

}
