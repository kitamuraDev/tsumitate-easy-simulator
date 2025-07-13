import { Component, type OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { OuterLayoutComponent } from './shared/components/outer-layout/outer-layout.component';
import { PageTitleService } from './shared/services/page-title.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, OuterLayoutComponent, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly pageTitleService = inject(PageTitleService);

  ngOnInit(): void {
    this.pageTitleService.setTitle();
  }
}
