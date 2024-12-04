import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Candidate2Component } from './candidate2.component';

describe('Candidate2Component', () => {
  let component: Candidate2Component;
  let fixture: ComponentFixture<Candidate2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Candidate2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Candidate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
