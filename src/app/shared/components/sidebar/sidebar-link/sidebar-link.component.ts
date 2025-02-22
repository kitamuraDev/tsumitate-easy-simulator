import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matCalculate, matHome, matStorage } from '@ng-icons/material-icons/baseline';
import type { SidebarIcon } from '../sidebar.component';

@Component({
  selector: 'app-sidebar-link',
  imports: [RouterLink, NgIcon],
  viewProviders: provideIcons({ matHome, matCalculate, matStorage }),
  template: `
    <li>
      <a
        routerLink="{{ path }}"
        class="hidden sm:flex items-center gap-3 p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
      >
        @switch (icon) {
          @case ('overview') {
            <ng-icon name="matHome" size="24" />
          }
          @case ('simulation') {
            <ng-icon name="matCalculate" size="24" />
          }
          @case ('history') {
            <ng-icon name="matStorage" size="24" />
          }
        }
        <span>{{ name }}</span>
      </a>
      <a
        routerLink="{{ path }}"
        data-drawer-toggle="logo-sidebar"
        class="flex sm:hidden items-center gap-3 p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
      >
        @switch (icon) {
          @case ('overview') {
            <ng-icon name="matHome" size="24" />
          }
          @case ('simulation') {
            <ng-icon name="matCalculate" size="24" />
          }
          @case ('history') {
            <ng-icon name="matStorage" size="24" />
          }
        }
        <span>{{ name }}</span>
      </a>
    </li>
  `,
})
export class SidebarLinkComponent {
  @Input({ required: true }) path!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) icon!: SidebarIcon;
}
