import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationThreeComponent } from './registration-three.component';

describe('RegistrationThreeComponent', () => {
  let component: RegistrationThreeComponent;
  let fixture: ComponentFixture<RegistrationThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
