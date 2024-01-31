import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAmountValueComponent } from './display-amount-value.component';

describe('DisplayAmountValueComponent', () => {
  let component: DisplayAmountValueComponent;
  let fixture: ComponentFixture<DisplayAmountValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayAmountValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayAmountValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
