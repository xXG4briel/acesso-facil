import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {

  constructor(private readonly httpService: HttpClient) { }

  create<T>(data: any): Observable<T> {
    const url = `${BASE_URL}/visitors`
    return this.httpService.post<T>(url, data);
  }

  approval<T>(id: string, approve: string): Observable<T> {
    const url = `${BASE_URL}/visitors/approval/${id}?approve=${approve}`
    return this.httpService.post<T>(url, {});
  }
}
