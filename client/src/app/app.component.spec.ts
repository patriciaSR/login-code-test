import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FAKE_LOGIN } from './fixtures/fake-login';
import { UserStoreService } from './stores/user-store.service';

const apiConfig = {
  api: 'http://localhost:3000'
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: UserStoreService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
        { path: 'login', component: LoginComponent}
      ])
    ],
    providers: [{ provide: 'apiConfig', useValue: apiConfig }],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.inject(UserStoreService);
    router = TestBed.inject(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Login-codeTest-Karumi'`, () => {
    expect(component.title).toEqual('Login-codeTest-Karumi');
  });

  it(`should redirect to login page if session expired`, () => {
    const spyRouter = spyOn(router, 'navigate');
    service.saveUserData(FAKE_LOGIN);

    component.ngOnInit();

    service.deleteUserData();

    expect(spyRouter).toHaveBeenCalledWith(['login']);
  });
});
