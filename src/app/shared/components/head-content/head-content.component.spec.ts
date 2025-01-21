import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadContentComponent } from './head-content.component';

describe('HeadContentComponent', () => {
  let component: HeadContentComponent;
  let fixture: ComponentFixture<HeadContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('タイトルが期待通りに表示されるか', () => {
    const title = 'タイトル';
    component.title = title;
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toContain(title);
  });
});
