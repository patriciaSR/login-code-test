import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FAKE_LOGIN } from '../fixtures/fake-login';
import { TokenDTO } from '../models/token-dto.model';
import { Store } from '../state/store';
import { UserStoreService } from './user-store.service';

const emptyUserData: TokenDTO = {
  token: '',
  user: {
    email: ''
  }
};

describe('UserStoreService', () => {
  let service: UserStoreService;
  let store: Store<TokenDTO>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Store]
    });

    service = TestBed.inject(UserStoreService);
    store = TestBed.inject(Store);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call sessionStore and return true on isLogin() method', () => {
    const spySession = spyOn(window.sessionStorage, 'getItem').and.callFake(() => '12345');

    const result = service.isLogin();
    expect(spySession).toHaveBeenCalledWith('userData');
    expect(result).toBe(true);
  });

  it('should call sessionStore and return false on isLogin() method', () => {
    const spySession = spyOn(window.sessionStorage, 'getItem').and.callFake(() => undefined);

    const result = service.isLogin();
    expect(spySession).toHaveBeenCalledWith('userData');
    expect(result).toBe(false);
  });

  it('should return an object with userData on getUserData() method', () => {
    service.saveUserData(FAKE_LOGIN);

    const result = service.getUserData();
    expect(result).toBe(FAKE_LOGIN);
  });

  it('should return undefinend without userData on getUserData() method', () => {
    const result = service.getUserData();
    expect(result).toBe(undefined);
  });

  it('should calls this.store with userData on saveUserData() method', () => {
    const spyStore = spyOn(service, 'store');

    service.saveUserData(FAKE_LOGIN);
    expect(spyStore).toHaveBeenCalledWith(FAKE_LOGIN);
  });

  it('should clear sessionstore and store class on deleteUserData() method', () => {
    const spySession = spyOn(window.sessionStorage, 'clear');

    service.deleteUserData();
    expect(spySession).toHaveBeenCalled();

    const result = service.getUserData();
    expect(result).toEqual(emptyUserData);
  });
});
