import { Component, type OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from './shared/components/header/header.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { OuterLayoutComponent } from './shared/components/outer-layout/outer-layout.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { PageTitleService } from './shared/services/page-title.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, OuterLayoutComponent, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly pageTitleService = inject(PageTitleService);

  ngOnInit(): void {
    initFlowbite();
    this.pageTitleService.setTitle();
  }
}
