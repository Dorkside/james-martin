import { TestBed } from '@angular/core/testing';

import { MainStore } from './main.store';

describe('MainStore', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainStore = TestBed.get(MainStore);
    expect(service).toBeTruthy();
  });
});
