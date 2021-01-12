import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Appointment>> {
    return this.http.get<Array<Appointment>>(`${environment.apiUrl}/appointments`).pipe(share());
  }
}
