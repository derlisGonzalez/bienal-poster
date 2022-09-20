import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisertantesComponent } from './disertantes.component';

describe('DisertantesComponent', () => {
  let component: DisertantesComponent;
  let fixture: ComponentFixture<DisertantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisertantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisertantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
