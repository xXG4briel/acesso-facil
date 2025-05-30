import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanysService {

  constructor(private readonly httpService: HttpClient) { }

  create<T>(data: any): Observable<T> {
    const url = `${BASE_URL}/companys`
    return this.httpService.post<T>(url, data);
  }
  getVisitors<T>(): Observable<T> {
    const url = `${BASE_URL}/companys/visitors`;
    return this.httpService.get<T>(url);
  }
  findAll<T>(): Observable<T[]> {
    const url = `${BASE_URL}/companys`;
    return this.httpService.get<T[]>(url);
  }
  createVisit<T>(data: any): Observable<T> {
    const url = `${BASE_URL}/companys/visit`
    return this.httpService.post<T>(url, data);
  }
  updateVisit<T>(id: string, data: any): Observable<T> {
    console.log('')
    const url = `${BASE_URL}/companys/visit/${id}`;
    return this.httpService.put<T>(url, data);
  }
}
