import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Error404Page } from './error404.page';

describe('Error404Page', () => {
  let component: Error404Page;
  let fixture: ComponentFixture<Error404Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Error404Page ],
      imports: [IonicModule.forRoot(), 
        RouterTestingModule.withRoutes(
          [{path: '**', component: Error404Page}]
        )]
    }).compileComponents();

    fixture = TestBed.createComponent(Error404Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
