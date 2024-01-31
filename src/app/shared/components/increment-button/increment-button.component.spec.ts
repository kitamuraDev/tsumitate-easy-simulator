import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementButtonComponent } from './increment-button.component';

describe('IncrementButtonComponent', () => {
  let component: IncrementButtonComponent;
  let fixture: ComponentFixture<IncrementButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncrementButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncrementButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
