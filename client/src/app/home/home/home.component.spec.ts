import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FAKE_LOGIN } from 'src/app/fixtures/fake-login';
import { UserStoreService } from 'src/app/stores/user-store.service';
import { HomeComponent } from './home.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: UserStoreService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(UserStoreService);
    service.saveUserData(FAKE_LOGIN);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userData property when userStore is not empty', () => {
    component.ngOnInit();

    expect(component.userData).toEqual(FAKE_LOGIN);
  });

  it('should call deleteUserData method when the user log out', () => {
    const spyService = spyOn(service, 'deleteUserData');

    component.logout();

    expect(spyService).toHaveBeenCalled();
  });
});
