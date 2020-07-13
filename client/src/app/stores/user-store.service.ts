import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenDTO } from '../models/token-dto.model';
import { Store } from '../state/store';


@Injectable({
  providedIn: 'root'
})

export class UserStoreService extends Store<TokenDTO|undefined> {
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
    this.store(undefined);
  }

  store(value: TokenDTO): void {
    super.store(value);

    if (value === undefined) {
      sessionStorage.clear();
    } else {
      sessionStorage.setItem('userData', JSON.stringify(value));
    }
  }
}
