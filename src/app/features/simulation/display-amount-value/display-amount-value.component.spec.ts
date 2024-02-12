import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAmountValueComponent } from './display-amount-value.component';
import { FormatService } from '../../../shared/services/format.service';

describe('DisplayAmountValueComponent', () => {
  let component: DisplayAmountValueComponent;
  let fixture: ComponentFixture<DisplayAmountValueComponent>;
  let formatService: FormatService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayAmountValueComponent],
      providers: [FormatService],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayAmountValueComponent);
    component = fixture.componentInstance;
    formatService = TestBed.inject(FormatService);
    fixture.detectChanges();
  });

  it('1280000の場合、万の位以下を切り捨てて、"128"で表示されるか', () => {
    const amount = 1280000;
    const formattedAmount = '128';

    jest.spyOn(formatService, 'formatAmountToTenThousand');

    component.compoundInterestCalcResult = amount;
    fixture.detectChanges();

    const spanElement = fixture.nativeElement.querySelector('span');
    expect(spanElement.textContent.trim()).toEqual(formattedAmount);
  });

  it('12825000の場合、万の位以下を切り捨てて、"1,282"で表示されるか', () => {
    const amount = 12825000;
    const formattedAmount = '1,282';

    jest.spyOn(formatService, 'formatAmountToTenThousand');

    component.compoundInterestCalcResult = amount;
    fixture.detectChanges();

    const spanElement = fixture.nativeElement.querySelector('span');
    expect(spanElement.textContent.trim()).toEqual(formattedAmount);
  });
});
