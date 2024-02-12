import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTextComponent } from './label-text.component';

describe('LabelTextComponent', () => {
  let component: LabelTextComponent;
  let fixture: ComponentFixture<LabelTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('isRequiredがtrueの場合、ラベルが*付きで表示されるか', () => {
    component.isRequired = true;
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.querySelector('span')).toBeTruthy();
    expect(labelElement.querySelector('span').textContent.trim()).toEqual('*');
  });

  it('isRequiredがfalseの場合、ラベルが*なしで表示されるか', () => {
    component.isRequired = false;
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.querySelector('span')).toBeNull();
  });
});
