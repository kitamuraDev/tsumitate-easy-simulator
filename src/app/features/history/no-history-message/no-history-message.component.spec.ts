import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoHistoryMessageComponent } from './no-history-message.component';

describe('NoHistoryMessageComponent', () => {
  let component: NoHistoryMessageComponent;
  let fixture: ComponentFixture<NoHistoryMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoHistoryMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoHistoryMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
