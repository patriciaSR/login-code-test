import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FAKE_LOGIN } from '../fixtures/fake-login';
import { LoginService } from './login.service';


const apiConfig = {
  api: 'http://localhost:3000'
};

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: 'apiConfig', useValue: apiConfig }]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call to server to post user login', async () => {
    const body = {
      email: 'test@email.com',
      password: 'testpass'
    };

    const httpMock = TestBed.inject(HttpTestingController);
    const responsePromise = service.getToken(body);
    const request = httpMock.expectOne('http://localhost:3000/auth');

    request.flush(FAKE_LOGIN);

    const response = await responsePromise;

    expect(response).toBe(FAKE_LOGIN);
    expect(request.request.method).toEqual('POST');

    httpMock.verify();
  });

  it('should reject the request when the username or password are invalid', async () => {
    const body = {
      email: 'invalid@email.com',
      password: 'invalidpass'
    };

    const mockErrorResponse = { status: 401, statusText: 'Unauthorized' };

    const httpMock = TestBed.inject(HttpTestingController);
    let request;

    try {
      const responsePromise = service.getToken(body);

      request = httpMock.expectOne('http://localhost:3000/auth');
      request.flush('', mockErrorResponse);
      await responsePromise;

      expect(true).toBe(false);
    } catch (errResponse) {
      expect(request.request.method).toEqual('POST');
      expect(errResponse.status).toBe(401);
      expect(errResponse.statusText).toBe('Unauthorized');

      httpMock.verify();
    }
  });
});
