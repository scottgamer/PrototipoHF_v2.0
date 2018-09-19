import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

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

/*   getAppsByCategory(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/applications/getappsbycategory/' + id, { headers: headers }).map(res => res.json());
  } */


  getAppsByCategory(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/applications/getappsbycategory/5ba11dee6343f715c0e786be', { headers: headers }).map(res => res.json());
  }
}
