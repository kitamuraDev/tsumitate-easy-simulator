import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OverviewIconComponent } from '../sidebar-icons/overview-icon.component';
import { SimulationIconComponent } from '../sidebar-icons/simulation-icon.component';
import { HistoryIconComponent } from '../sidebar-icons/history-icon.component';
import { SidebarIcon } from '../sidebar.component';

@Component({
  selector: 'app-sidebar-link',
  imports: [RouterLink, OverviewIconComponent, SimulationIconComponent, HistoryIconComponent],
  template: `
    <li>
      <a
        routerLink="{{ path }}"
        class="hidden sm:flex items-center gap-3 p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
      >
        @switch (icon) {
          @case ('overview') {
            <app-overview-icon />
          }
          @case ('simulation') {
            <app-simulation-icon />
          }
          @case ('history') {
            <app-history-icon />
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
            <app-overview-icon />
          }
          @case ('simulation') {
            <app-simulation-icon />
          }
          @case ('history') {
            <app-history-icon />
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
