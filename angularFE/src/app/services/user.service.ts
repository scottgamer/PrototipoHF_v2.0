import { Injectable } from '@angular/core';

//import classes
import { User } from '../models/user-model';
import { USERS } from '../components/user/user-mock';

import { Observable} from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserService {

  constructor() { }

  getUser(id:number): Observable<User>{
    return of(USERS.find(user => user.id === id));
  }

}
