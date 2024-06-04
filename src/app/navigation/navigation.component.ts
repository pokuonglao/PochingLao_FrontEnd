import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLinkActive,NgClass],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Input() showNavigation: boolean = false;
  constructor() {}
  toggleNavigation() {
    this.showNavigation = !this.showNavigation;
  }
  
}
