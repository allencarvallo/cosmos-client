import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [RouterModule, MatListModule, MatIconModule, MatDividerModule],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
})
export class SideMenu {
  navItems = [
    { label: 'Invoices', icon: 'receipt', route: '/invoices' },
    { label: 'Customers', icon: 'people', route: '/customers' },
  ];
}
