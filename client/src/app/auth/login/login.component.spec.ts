import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FAKE_LOGIN } from '../../fixtures/fake-login';
import { LoginService } from '../login.service';
import { LoginComponent } from './login.component';



const apiConfig = {
  api: 'http://localhost:3000'
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [{ provide: 'apiConfig', useValue: apiConfig }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set form property', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

  it('should show an error if data is empty', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    const spyRouter = spyOn(router, 'navigate');

    component.login(event);

    expect(component.errorText).toBe('Invalid username or password');
    expect(event.preventDefault).toHaveBeenCalled();
    expect(spyRouter).not.toHaveBeenCalled();
  });

  it('should redirect to home if user is valid', async () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    const spyService = spyOn(loginService, 'getToken').and.callFake(() => Promise.resolve(FAKE_LOGIN));
    const spyRouter = spyOn(router, 'navigate');

    component.form.setValue({
      email: 'test@email.com',
      password: 'passtest'
    });

    await component.login(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalled();
    expect(spyRouter).toHaveBeenCalledWith(['home']);
  });

  it('should not redirect to home if user is not valid', async () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    const error = new Error();
    const spyService = spyOn(loginService, 'getToken').and.callFake(() => Promise.reject(error));
    const spyRouter = spyOn(router, 'navigate');

    component.form.setValue({
      email: 'bad@email.com',
      password: 'badpass'
    });

    await component.login(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalled();
    expect(spyRouter).not.toHaveBeenCalled();
    expect(component.errorText).toBe('Invalid username or password');
  });
});
