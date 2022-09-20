import { TestBed } from '@angular/core/testing';

import { EvaluadoresService } from './evaluadores.service';

describe('EvaluadoresService', () => {
  let service: EvaluadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
