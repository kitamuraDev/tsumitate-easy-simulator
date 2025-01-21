import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { DecrementButtonComponent } from './decrement-button.component';

describe('DecrementButtonComponent', () => {
  let component: DecrementButtonComponent;
  let fixture: ComponentFixture<DecrementButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecrementButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DecrementButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ボタン押下でクリックイベントが発火されるか', () => {
    const emitSpy = jest.spyOn(component.decrement, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitSpy).toHaveBeenCalled();
  });
});
