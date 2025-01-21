import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleButtonComponent } from './toggle-button.component';

describe('ToggleButtonComponent', () => {
  let component: ToggleButtonComponent;
  let fixture: ComponentFixture<ToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ボタン押下でクリックイベントが発火されるか', () => {
    const emitSpy = jest.spyOn(component.clickEvent, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('開いている状態の場合、期待通りのクラスが適用されているか', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('svg');

    expect(button.classList).toContain('rotate-180');
  });

  it('閉じている性状態の場合、期待通りのクラスが適用されているか', () => {
    component.isOpen = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('svg');

    expect(button.classList).toContain('rotate-90');
  });
});
