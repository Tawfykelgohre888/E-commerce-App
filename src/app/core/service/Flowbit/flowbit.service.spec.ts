import { TestBed } from '@angular/core/testing';

import { FlowbiteService } from './flowbit.service';

describe('FlowbitService', () => {
  let service: FlowbiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowbiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
