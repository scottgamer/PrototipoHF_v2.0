import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//import classes
import { Application } from '../models/application-model';
import { Config } from '../components/global-config/config';

@Injectable()
export class ApplicationService {

  config: Config;
  localhost: string;

  constructor(private http: Http) {
    this.config = new Config('http://192.168.100.107:3000/');
    this.localhost = this.config.getLocalhostURI();
  }

  getUri() {
    console.log(this.localhost);
  }

  postLogo(formData) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.localhost + 'upload', formData)
      .map(files => files.json());
  }

  postImages(formData) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.localhost + 'applications/upload', formData)
      .map(res => res.json());
  }

  postApplication(application) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.localhost + 'applications/add', application, { headers: headers }).map(res => res.json());
  }

  getApplications(): Observable<Application[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.localhost + 'applications/getapps', { headers: headers }).map(res => res.json());
  }

  getApplication(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.localhost + 'applications/getone/' + id, { headers: headers }).map(res => res.json());
  }

  getAppsByCategory(id): Observable<Application[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.localhost + 'applications/getappsbycategory/' + id, { headers: headers }).map(res => res.json());
  }

  postComment(appId, comment) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.localhost + 'applications/newcommentary/' + appId, comment, { headers: headers })
      .map(res => res.json());
  }

  postRating(appId, rating) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.localhost + 'applications/newrating/' + appId, rating, { headers: headers })
      .map(res => res.json());
  }

  updateUser(user) {
    let userId = user.id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.localhost + 'users/update/' + userId, user, { headers: headers })
      .map(res => res.json());
  }

  getComment(commentId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.localhost + 'applications/getcomment/' + commentId, { headers: headers }).map(res => res.json());
  }

  getUser(userId) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.localhost + 'applications/getuser/' + userId).map(res => res.json());
  }

  postQuestion(question) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.localhost + 'questions/add', question, { headers: headers })
      .map(res => res.json());
  }

  getQuestions(appId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.localhost + 'questions/getquestions/byappid/' + appId, { headers: headers })
      .map(res => res.json());
  }

  postResponse(questionId, response) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .put(this.localhost + 'questions/putresponsetoquestionbyid/' + questionId, response)
      .map(res => res.json());
  }

}
