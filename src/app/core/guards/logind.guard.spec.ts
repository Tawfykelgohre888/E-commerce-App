import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logindGuard } from './logind.guard';

describe('logindGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logindGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
