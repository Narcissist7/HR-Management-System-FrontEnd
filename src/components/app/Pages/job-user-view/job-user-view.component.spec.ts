import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobUserViewComponent } from './job-user-view.component';

describe('JobUserViewComponent', () => {
  let component: JobUserViewComponent;
  let fixture: ComponentFixture<JobUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobUserViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
