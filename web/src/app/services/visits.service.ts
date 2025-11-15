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
  postVisit<T>(data: any): Observable<T> {
    const url = `${BASE_URL}/visits`
    return this.httpService.post<T>(url, data);
  }
  patchVisit<T>(id: string, data: any): Observable<T> {
    const url = `${BASE_URL}/visits/${id}`
    return this.httpService.patch<T>(url, data);
  }
  uploadAll<T>(id: string, files: any): Observable<T> {
    const url = `${BASE_URL}/visits/${id}/upload`
    const formData = new FormData();

    files.forEach((file: any) => {
      formData.append('file', file);
    });

    return this.httpService.post<T>(url, formData);
  }
  getVisits<T>(): Observable<T> {
    const url = `${BASE_URL}/visits/companys`
    return this.httpService.get<T>(url);
  }
  getVisitsByVisitors<T>(): Observable<T> {
    const url = `${BASE_URL}/visits/visitors`
    return this.httpService.get<T>(url);
  }
  approveVisit<T>(id: string, data: any): Observable<T> {
    const url = `${BASE_URL}/visits/${id}`
    return this.httpService.patch<T>(url, data);
  }
  delete<T>(id: string, documentVisitId: string): Observable<T> {
    const url = `${BASE_URL}/visits/${id}/file/${documentVisitId}`
    return this.httpService.delete<T>(url);
  }
}
