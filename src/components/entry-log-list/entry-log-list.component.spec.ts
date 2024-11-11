import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryLogListComponent } from './entry-log-list.component';

describe('EntryLogListComponent', () => {
  let component: EntryLogListComponent;
  let fixture: ComponentFixture<EntryLogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryLogListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
