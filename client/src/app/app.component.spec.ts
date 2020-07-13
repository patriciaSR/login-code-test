import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FAKE_LOGIN } from './fixtures/fake-login';
import { UserStoreService } from './stores/user-store.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: UserStoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.inject(UserStoreService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Login-codeTest-Karumi'`, () => {
    expect(component.title).toEqual('Login-codeTest-Karumi');
  });

  it(`should call userStore service to check if user is logged`, () => {
    const spyIsLogin = spyOn(service, 'isLogin').and.returnValue(true);
    const spyGetUserData = spyOn(service, 'getUserData').and.returnValue(FAKE_LOGIN);

    component.ngOnInit();

    expect(component.userLogged).toBe(true);
    expect(spyIsLogin).toHaveBeenCalled();
    expect(spyGetUserData).toHaveBeenCalled();
    expect(component.userData).toEqual(FAKE_LOGIN.user);
  });
});
