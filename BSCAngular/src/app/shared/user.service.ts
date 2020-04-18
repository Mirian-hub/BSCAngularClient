import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
readonly BaseUrl = 'http://localhost:49946/api/';
  constructor(private http: HttpClient) { }

  login(formData) {
    return this.http.post(this.BaseUrl + 'Login', formData);
  }
  getListView() {
    return this.http.get(this.BaseUrl + 'listview');
  }

}
