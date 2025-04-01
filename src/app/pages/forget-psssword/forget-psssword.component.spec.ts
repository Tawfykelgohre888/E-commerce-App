import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPssswordComponent } from './forget-psssword.component';

describe('ForgetPssswordComponent', () => {
  let component: ForgetPssswordComponent;
  let fixture: ComponentFixture<ForgetPssswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetPssswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPssswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
