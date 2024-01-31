import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { OuterLayoutComponent } from './shared/components/outer-layout/outer-layout.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, OuterLayoutComponent, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
