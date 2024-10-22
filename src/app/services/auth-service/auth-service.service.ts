import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.model';
<<<<<<< HEAD
import { ToastService } from '../../shared/components/am-toast/toast.service';
=======
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
<<<<<<< HEAD
      'Access-Control-Allow-Origin':
        'https://back-am-production.up.railway.app',
    }),
  };

  constructor(private http: HttpClient, private readonly toast: ToastService) {}
=======
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    }),
  };

  constructor(private http: HttpClient) {}
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02

  login(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http
      .post(`${environment.users}/login`, body, this.options)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
<<<<<<< HEAD
          if (error.status === 500) {
            this.toast.show(
              'error',
              'Error del Servidor',
              'Inténtalo de nuevo más tarde.'
            );
          }
          return error;
=======
          throw error;
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02
        })
      );
  }

  register(user: User): Observable<any> {
    const body = user;
<<<<<<< HEAD
    return this.http
      .post(`${environment.users}/signin`, body, this.options)
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          throw error;
        })
      );
=======
    return this.http.post(`${environment.users}/signin`, body, this.options).pipe(
      map((response: any) => response),
      catchError((error: any) => {
        throw error;
      })
    )
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02
  }
}
