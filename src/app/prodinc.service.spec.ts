import { TestBed } from '@angular/core/testing';

import { ProdincService } from './prodinc.service';

describe('ProdincService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdincService = TestBed.get(ProdincService);
    expect(service).toBeTruthy();
  });
});
