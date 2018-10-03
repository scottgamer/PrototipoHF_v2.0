import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

import { Config } from '../components/global-config/config';


@Injectable()
export class AuthService {

  authToken: any;
  user: any;

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

  /**Post Methods */

  registerUser(user) {
    return this.http.post(this.localhost + 'users/register', user, { headers: this.headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    return this.http.post(this.localhost + 'users/authenticate', user, { headers: this.headers })
      .map(res => res.json());
  }

  updateUser(user) {
    let userId = user.id;
    return this.http.put(this.localhost + 'users/update/' + userId, user, { headers: this.headers })
      .map(res => res.json());
  }

  addApplicationToUserHistory(appId, user) {
    return this.http
      .put(this.localhost + 'users/adddownloadedapplication/' + appId, user, { headers: this.headers })
      .map(res => res.json());
  }

  addEventToUserHistory(eventId, user) {
    return this.http.put(this.localhost + 'users/addsavedevent/' + eventId, user, { headers: this.headers })
      .map(res => res.json());
  }

  /*********************************************************************************************************************** */

  /**Get Methods */

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.localhost + 'users/profile', { headers: headers })
      .map(res => res.json());
  }

  getUserDownloadedApp(appId) {
    return this.http.get(this.localhost + 'users/getuserapp/' + appId, { headers: this.headers })
      .map(res => res.json());
  }

  getUserSavedEvent(eventId) {
    return this.http.get(this.localhost + 'users/getuserevent/' + eventId, { headers: this.headers })
      .map(res => res.json());
  }

  getUserQuestionsMade(questionId) {
    return this.http.get(this.localhost + 'users/getuserquestion/' + questionId, { headers: this.headers })
      .map(res => res.json());
  }

  getUserById(id) {
    return this.http.get(this.localhost + 'users/getone/' + id, { headers: this.headers })
      .map(res => res.json());
  }

  /*********************************************************************************************************************** */

  /**Other Methods */

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', user.id);
    this.authToken = token;
    this.user = user;
  }

  getUserId() {
    const userId = localStorage.getItem('userId');
    return userId;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  /*********************************************************************************************************************** */

}
