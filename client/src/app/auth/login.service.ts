import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenDTO } from '../models/token-dto.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, @Inject('apiConfig') private apiConfig) { }

  getToken(body: {}): Observable<TokenDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<TokenDTO>(this.apiConfig.api + '/auth', body, httpOptions);
  }
}
