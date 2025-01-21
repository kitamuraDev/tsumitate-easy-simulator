import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ヘッダーが作成されるか', () => {
    expect(component).toBeTruthy();
  });

  it('data-drawer-target="logo-sidebar" 属性を持つボタンがあるか', () => {
    const button = fixture.nativeElement.querySelector('button[data-drawer-target="logo-sidebar"]');
    expect(button).toBeTruthy();
  });

  it('data-drawer-toggle="logo-sidebar" 属性を持つボタンがあるか', () => {
    const button = fixture.nativeElement.querySelector('button[data-drawer-toggle="logo-sidebar"]');
    expect(button).toBeTruthy();
  });
});
