import { Component, type OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './shared/components/navigation-bar/navigation-bar.component';
import { OuterLayoutComponent } from './shared/components/outer-layout/outer-layout.component';
import { PageTitleService } from './shared/services/page-title.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBarComponent, OuterLayoutComponent],
  template: `
    <app-navigation-bar />
    <app-outer-layout>
      <router-outlet />
    </app-outer-layout>
  `,
})
export class AppComponent implements OnInit {
  private readonly pageTitleService = inject(PageTitleService);

  ngOnInit(): void {
    this.pageTitleService.setTitle();
  }
}
