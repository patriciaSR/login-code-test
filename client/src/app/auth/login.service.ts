import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TokenDTO } from '../models/token-dto.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, @Inject('apiConfig') private apiConfig) { }

  async getToken(body: {}): Promise<TokenDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return await this.http.post<TokenDTO>(this.apiConfig.api + '/auth', body, httpOptions).toPromise();
  }
}
