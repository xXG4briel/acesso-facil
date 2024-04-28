import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  constructor(private readonly httpService: HttpClient) { }

  getVisit<T>(id: string): Observable<T> {
    const url = `${BASE_URL}/visits/${id}`
    return this.httpService.get<T>(url);
  }
  getVisits<T>(): Observable<T> {
    const url = `${BASE_URL}/visits/companys`
    return this.httpService.get<T>(url);
  }
  approveVisit<T>(id: string, data: any): Observable<T> {
    const url = `${BASE_URL}/visits/${id}`
    return this.httpService.patch<T>(url, data);
  }
}
