import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarLinkComponent } from './sidebar-link.component';

describe('SidebarLinkComponent', () => {
  let component: SidebarLinkComponent;
  let fixture: ComponentFixture<SidebarLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarLinkComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('【1】インプットの値に応じた期待通りの name,icon が表示されるか', () => {
    const name = 'はじめに';
    const icon = 'overview';

    component.name = name;
    component.icon = icon;
    fixture.detectChanges();

    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.textContent.trim()).toEqual(name);

    const iconElement = fixture.nativeElement.querySelector('app-overview-icon');
    expect(iconElement).toBeTruthy();
  });

  it('【2】インプットの値に応じた期待通りの name,icon が表示されるか', () => {
    const name = 'シュミレーション';
    const icon = 'simulation';

    component.name = name;
    component.icon = icon;
    fixture.detectChanges();

    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.textContent.trim()).toEqual(name);

    const iconElement = fixture.nativeElement.querySelector('app-simulation-icon');
    expect(iconElement).toBeTruthy();
  });

  it('【3】インプットの値に応じた期待通りの name,icon が表示されるか', () => {
    const name = '履歴';
    const icon = 'history';

    component.name = name;
    component.icon = icon;
    fixture.detectChanges();

    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.textContent.trim()).toEqual(name);

    const iconElement = fixture.nativeElement.querySelector('app-history-icon');
    expect(iconElement).toBeTruthy();
  });
});
