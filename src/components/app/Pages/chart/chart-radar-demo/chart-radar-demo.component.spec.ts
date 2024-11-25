import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRadarDemo } from './chart-radar-demo.component';

describe('ChartRadarDemoComponent', () => {
  let component: ChartRadarDemo;
  let fixture: ComponentFixture<ChartRadarDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartRadarDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartRadarDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
