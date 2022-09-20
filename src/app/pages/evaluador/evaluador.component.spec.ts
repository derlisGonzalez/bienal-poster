import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluadorComponent } from './evaluador.component';

describe('EvaluadorComponent', () => {
  let component: EvaluadorComponent;
  let fixture: ComponentFixture<EvaluadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
