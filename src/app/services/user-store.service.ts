import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  public isLoggedIn: boolean = false;
  constructor() { }
}
