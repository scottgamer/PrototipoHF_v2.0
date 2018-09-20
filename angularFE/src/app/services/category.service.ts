import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryService {

  constructor(private http:Http) { }

  getCategories(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/categories/getall', { headers: headers }).map(res => res.json());
  }

  getCategory(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/categories/getone/' + id, { headers: headers }).map(res => res.json());
  }

}
