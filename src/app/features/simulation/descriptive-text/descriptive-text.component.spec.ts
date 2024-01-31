import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptiveTextComponent } from './descriptive-text.component';

describe('DescriptiveTextComponent', () => {
  let component: DescriptiveTextComponent;
  let fixture: ComponentFixture<DescriptiveTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptiveTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriptiveTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
