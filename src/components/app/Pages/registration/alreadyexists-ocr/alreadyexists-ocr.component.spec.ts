import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyexistsOCRComponent } from './alreadyexists-ocr.component';

describe('AlreadyexistsOCRComponent', () => {
  let component: AlreadyexistsOCRComponent;
  let fixture: ComponentFixture<AlreadyexistsOCRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlreadyexistsOCRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlreadyexistsOCRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
