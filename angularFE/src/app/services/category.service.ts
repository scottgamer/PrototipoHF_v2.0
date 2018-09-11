import { Injectable } from '@angular/core';

//import classes
import { Category } from '../models/category-model';
import { CATEGORIES } from '../components/category/category-mock';

import { Observable} from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CategoryService {

  constructor() { }

  getCategories(): Observable<Category[]>{
    console.log('Categories service loaded');
    return of(CATEGORIES);
  }

  getCategory(id:number): Observable<Category>{
    return of(CATEGORIES.find(category => category.id===id));
  }

}
