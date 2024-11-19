import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NtgAppsLoaderComponent } from './ntg-apps-loader.component';

describe('NtgAppsLoaderComponent', () => {
  let component: NtgAppsLoaderComponent;
  let fixture: ComponentFixture<NtgAppsLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NtgAppsLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NtgAppsLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
