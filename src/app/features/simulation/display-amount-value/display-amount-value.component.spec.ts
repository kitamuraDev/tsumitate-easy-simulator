import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { TruncateToTenThousandsPipe } from '../../../shared/pipes/truncate-to-ten-thousands.pipe';
import { DisplayAmountValueComponent } from './display-amount-value.component';

describe('DisplayAmountValueComponent', () => {
  let component: DisplayAmountValueComponent;
  let fixture: ComponentFixture<DisplayAmountValueComponent>;
  let truncateToTenThousandsPipe: TruncateToTenThousandsPipe;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayAmountValueComponent],
      providers: [TruncateToTenThousandsPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayAmountValueComponent);
    component = fixture.componentInstance;
    truncateToTenThousandsPipe = TestBed.inject(TruncateToTenThousandsPipe);
    fixture.detectChanges();
  });

  it('1280000の場合、万の位以下を切り捨てて、"128"で表示されるか', () => {
    const amount = 1280000;
    const formattedAmount = '128';

    jest.spyOn(truncateToTenThousandsPipe, 'transform');

    component.compoundInterestCalcResult = amount;
    fixture.detectChanges();

    const spanElement = fixture.nativeElement.querySelector('span');
    expect(spanElement.textContent.trim()).toEqual(formattedAmount);
  });

  it('12825000の場合、万の位以下を切り捨てて、"1,282"で表示されるか', () => {
    const amount = 12825000;
    const formattedAmount = '1,282';

    jest.spyOn(truncateToTenThousandsPipe, 'transform');

    component.compoundInterestCalcResult = amount;
    fixture.detectChanges();

    const spanElement = fixture.nativeElement.querySelector('span');
    expect(spanElement.textContent.trim()).toEqual(formattedAmount);
  });
});
