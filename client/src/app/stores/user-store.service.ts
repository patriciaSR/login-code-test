import { Injectable } from '@angular/core';
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

  constructor() {
    super();
  }

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

  saveUserData(userData: TokenDTO): void {
    sessionStorage.setItem('userData', JSON.stringify(userData));
    this.store(userData);
  }

  deleteUserData(): void {
    sessionStorage.clear();
    this.store(emptyUserData);
  }
}
