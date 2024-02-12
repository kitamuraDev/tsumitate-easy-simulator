import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseButtonComponent } from './base-button.component';

describe('BaseButtonComponent', () => {
  let component: BaseButtonComponent;
  let fixture: ComponentFixture<BaseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ボタン押下でクリックイベントが発火されるか', () => {
    const emitSpy = jest.spyOn(component.clickEvent, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('活性状態の場合、期待通りのクラスが適用されているか', () => {
    component.isDisabled = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');

    expect(button.classList).toContain('bg-blue-500');
    expect(button.classList).toContain('hover:opacity-70');
  });

  it('非活性状態の場合、期待通りのクラスが適用されているか', () => {
    component.isDisabled = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');

    expect(button.classList).toContain('bg-blue-500');
    expect(button.classList).toContain('bg-opacity-40');
    expect(button.classList).toContain('cursor-not-allowed');
  });
});
