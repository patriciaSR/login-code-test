import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenDTO } from '../models/token-dto.model';
import { Store } from '../state/store';


const emptyUserData: TokenDTO = {
  token: '',
  user: {
    email: ''
  }
};

@Injectable({
  providedIn: 'root'
})

export class UserStoreService extends Store<TokenDTO> {

  isLogin(): boolean {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      this.store(JSON.parse(userData));
      return true;
    }

    return false;
  }

  getUserData(): TokenDTO {
    return this.get();
  }

  getUserDataSuscription(): Observable<TokenDTO> {
    return this.get$();
  }

  saveUserData(userData: TokenDTO): void {
    this.store(userData);
  }

  deleteUserData(): void {
    this.store(emptyUserData);
  }

  store(value: TokenDTO): void {
    super.store(value);

    if (value === emptyUserData) {
      sessionStorage.clear();
    } else {
      sessionStorage.setItem('userData', JSON.stringify(value));
    }
  }
}
