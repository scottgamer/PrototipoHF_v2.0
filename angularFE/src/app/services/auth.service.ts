import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers }).map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers }).map(res => res.json());

  }

  updateUser(user) {
    let userId = user.id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/users/update/' + userId, user, { headers: headers }).map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', user.id);
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers: headers }).map(res => res.json());

  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getUserId() {
    const userId = localStorage.getItem('userId');
    return userId;
  }

  getUserDownloadedApp(appId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/getuserapp/' + appId, { headers: headers })
      .map(res => res.json());
  }

  addApplicationToUserHistory(appId, user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .put('http://localhost:3000/users/adddownloadedapplication/' + appId, user, { headers: headers })
      .map(res => res.json());

  }

  getUserSavedEvent(eventId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/getuserevent/' + eventId, { headers: headers })
      .map(res => res.json());
  }

  addEventToUserHistory(eventId, user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/users/addsavedevent/' + eventId, user, { headers: headers })
      .map(res => res.json());

  }

  getUserById(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/getone/' + id, {headers:headers})
    .map(res => res.json());
  }
}
