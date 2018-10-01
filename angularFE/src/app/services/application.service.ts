import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//import classes
import { Application } from '../models/application-model';

@Injectable()
export class ApplicationService {

  constructor(private http: Http) {
  }

  postLogo(formData){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/upload', formData)
    .map(files => files.json());
  }

  /* postLogo(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/upload', {headers:headers}).map(res => res.json());
  }
 */
  postApplication(application) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/applications/add', application, {headers:headers}).map(res => res.json());
  }

  getApplications(): Observable<Application[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/applications/getapps', { headers: headers }).map(res => res.json());
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

  getQuestions(appId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/questions/getquestions/byappid/' + appId, { headers: headers })
      .map(res => res.json());
  }

  postResponse(questionId, response) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .put('http://localhost:3000/questions/putresponsetoquestionbyid/' + questionId, response)
      .map(res => res.json());
  }

}
