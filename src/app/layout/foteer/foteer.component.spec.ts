import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoteerComponent } from './foteer.component';

describe('FoteerComponent', () => {
  let component: FoteerComponent;
  let fixture: ComponentFixture<FoteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoteerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
