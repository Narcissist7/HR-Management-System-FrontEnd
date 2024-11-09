import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyexistsComponent } from './alreadyexists.component';

describe('AlreadyexistsComponent', () => {
  let component: AlreadyexistsComponent;
  let fixture: ComponentFixture<AlreadyexistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlreadyexistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlreadyexistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
