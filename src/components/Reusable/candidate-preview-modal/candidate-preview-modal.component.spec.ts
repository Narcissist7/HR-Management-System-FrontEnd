import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatePreviewModalComponent } from './candidate-preview-modal.component';

describe('CandidatePreviewModalComponent', () => {
  let component: CandidatePreviewModalComponent;
  let fixture: ComponentFixture<CandidatePreviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatePreviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatePreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
