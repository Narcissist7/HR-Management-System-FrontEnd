import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryLogDetailsComponent } from './entry-log-details.component';

describe('EntryLogDetailsComponent', () => {
  let component: EntryLogDetailsComponent;
  let fixture: ComponentFixture<EntryLogDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryLogDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
