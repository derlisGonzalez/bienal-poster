import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisertanteComponent } from './disertante.component';

describe('DisertanteComponent', () => {
  let component: DisertanteComponent;
  let fixture: ComponentFixture<DisertanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisertanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisertanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
