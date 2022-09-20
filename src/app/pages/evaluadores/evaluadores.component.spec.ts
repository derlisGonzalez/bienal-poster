import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluadoresComponent } from './evaluadores.component';

describe('EvaluadoresComponent', () => {
  let component: EvaluadoresComponent;
  let fixture: ComponentFixture<EvaluadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
