import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpService: HttpClient) { }

  login<T>(data: any, type: 'visitors' | 'companys'): Observable<T> {
    const url = `${BASE_URL}/auth/${type}`
    return this.httpService.post<T>(url, data);
  }

  get() {
    return localStorage.getItem('access_token');
  }

  set(data: string) {
    localStorage.setItem('access_token', data)
  }

}
