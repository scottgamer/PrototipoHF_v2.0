import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//import classes
import { Application } from '../models/application-model';
import { map } from '../../../node_modules/rxjs/operator/map';

@Injectable()
export class ApplicationService {

  constructor(private http: Http) { 
  }

  getApplications(): Observable<Application[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://192.168.100.107:3000/applications/getapps', { headers: headers }).map(res => res.json());
  }

  getApplication(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/applications/getone/' + id, { headers: headers }).map(res => res.json());
  }

  getAppsByCategory(id): Observable<Application[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/applications/getappsbycategory/' + id, { headers: headers }).map(res => res.json());
  }

  postCommentAndRating(appId, comment) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:3000/applications/newcommentary/' + appId, comment, { headers: headers })
      .map(res => res.json());
  }

  updateUser(user) {
    let userId = user.id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/users/update/' + userId, user, { headers: headers })
      .map(res => res.json());
  }

  getComment(commentId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/applications/getcomment/' + commentId, { headers: headers }).map(res => res.json());
  }

  getUser(userId) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/applications/getuser/' + userId).map(res => res.json());
  }

  postQuestion(question) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/questions/add', question, { headers: headers })
      .map(res => res.json());
  }

  getQuestions(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/questions/getquestions/byappid/' + id, { headers: headers })
      .map(res => res.json());
  }

}
