import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecrementButtonComponent } from './decrement-button.component';

describe('DecrementButtonComponent', () => {
  let component: DecrementButtonComponent;
  let fixture: ComponentFixture<DecrementButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecrementButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecrementButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
