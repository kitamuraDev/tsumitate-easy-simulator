import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationWarningMessageComponent } from './validation-warning-message.component';

describe('ValidationWarningMessageComponent', () => {
  let component: ValidationWarningMessageComponent;
  let fixture: ComponentFixture<ValidationWarningMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationWarningMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidationWarningMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
