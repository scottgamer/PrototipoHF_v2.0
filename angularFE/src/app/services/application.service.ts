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
  headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.config = new Config();
    this.localhost = this.config.getLocalhostURI();
  }

  getUri() {
    console.log(this.localhost);
  }

  /* Post Methods */

  postImages(formData) {
    return this.http.post(this.localhost + 'applications/upload', formData)
      .map(res => res.json());
  }

  postApplication(application) {
    return this.http.post(this.localhost + 'applications/add', application, { headers: this.headers })
      .map(res => res.json());
  }

  postComment(appId, comment) {
    return this.http
      .post(this.localhost + 'applications/newcommentary/' + appId, comment, { headers: this.headers })
      .map(res => res.json());
  }

  postRating(appId, rating) {
    return this.http
      .post(this.localhost + 'applications/newrating/' + appId, rating, { headers: this.headers })
      .map(res => res.json());
  }

  postQuestion(question) {
    return this.http.post(this.localhost + 'questions/add', question, { headers: this.headers })
      .map(res => res.json());
  }

  updateUser(user) {
    let userId = user.id;
    return this.http.put(this.localhost + 'users/update/' + userId, user, { headers: this.headers })
      .map(res => res.json());
  }

  postResponse(questionId, response) {
    return this.http
      .put(this.localhost + 'questions/putresponsetoquestionbyid/' + questionId, response)
      .map(res => res.json());
  }
  /*******************************************************************************************************************************/
  /* Get Methods */

  getApplications(): Observable<Application[]> {

    return this.http.get(this.localhost + 'applications/getapps', { headers: this.headers }).map(res => res.json());
  }

  getBestRated() {

    return this.http.get(this.localhost + 'applications/getbestrated', { headers: this.headers }).map(res => res.json());
  }

  getLatest() {
    return this.http.get(this.localhost + 'applications/getlatestapps').map(res => res.json());
  }

  getApplication(id) {

    return this.http.get(this.localhost + 'applications/getone/' + id, { headers: this.headers }).map(res => res.json());
  }

  getAppsByCategory(id): Observable<Application[]> {

    return this.http.get(this.localhost + 'applications/getappsbycategory/' + id, { headers: this.headers }).map(res => res.json());
  }

  getComment(commentId) {
    return this.http.get(this.localhost + 'applications/getcomment/' + commentId, { headers: this.headers }).map(res => res.json());
  }

  getUser(userId) {
    return this.http.get(this.localhost + 'applications/getuser/' + userId).map(res => res.json());
  }

  getQuestions(appId) {
    return this.http.get(this.localhost + 'questions/getquestions/byappid/' + appId, { headers: this.headers })
      .map(res => res.json());
  }

}
