import { TestBed } from '@angular/core/testing';

import { CriterioAceptacionService } from './criterio-aceptacion.service';

describe('CriterioAceptacionService', () => {
  let service: CriterioAceptacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriterioAceptacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
