import { Injectable } from '@angular/core';

//import classes
import { Application } from '../models/application-model';
import { APPLICATIONS } from '../components/application/application-mock';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApplicationService {

  constructor(private http: Http) { }

  //returns an Observable<Application[]> that emits a single 
  //value, the array of mock heroes.
  getApplications(): Observable<Application[]> {
    console.log('Application service loaded');
    return of(APPLICATIONS);
  }

  /*   getApplication(id): Observable<Application> {
      return of(APPLICATIONS.find(application => application._id === id));
    } */

  getApplication(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/applications/getone/' + id, { headers: headers }).map(res => res.json());
    //return this.http.get('http://localhost:3000/applications/getone/' + id, { headers: headers });
  }

  getAppsByCategory(id): Observable<Application[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/applications/getappsbycategory/'+id, { headers: headers }).map(res => res.json());
  }

}
