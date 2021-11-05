import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIClientService {

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    })
  };

  apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {
  }

  getUsuario(userId: number): Observable<any> {
    return this.http.get(this.apiUrl + '/users/' + userId).pipe(
      retry(3)
    );
  }

  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl + '/users/').pipe(
      retry(3)
    );
  }

  getPublicaciones(): Observable<any> {
    return this.http.get(this.apiUrl + '/posts/').pipe(
      retry(3)
    );
  }

  getPublicacion(idPublicacion: number): Observable<any> {
    return this.http.get(this.apiUrl + '/posts/' + idPublicacion).pipe(
      retry(3)
    );
  }

  createPublicacion(publicacion: any): Observable<any> {
    return this.http.post(this.apiUrl + '/posts/', publicacion, this.httpOptions).pipe(
      retry(3)
    );
  }

  updatePublicacion(publicacion: any): Observable<any> {
    return this.http.put(this.apiUrl + '/posts/' + publicacion.id, publicacion, this.httpOptions)
      .pipe(retry(3)
    );
  }

  deletePublicacion(publicacionId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/posts/' + publicacionId, this.httpOptions).pipe(
      retry(3)
    );
  }

}
