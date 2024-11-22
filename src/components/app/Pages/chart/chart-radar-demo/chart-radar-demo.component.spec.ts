import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRadarDemoComponent } from './chart-radar-demo.component';

describe('ChartRadarDemoComponent', () => {
  let component: ChartRadarDemoComponent;
  let fixture: ComponentFixture<ChartRadarDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartRadarDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartRadarDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
