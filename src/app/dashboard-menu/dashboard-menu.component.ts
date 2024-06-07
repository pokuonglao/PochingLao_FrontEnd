import { Component } from '@angular/core';
import { MessagesComponent } from '../messages/messages.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from '../patients/patients.component';

@Component({
  selector: 'app-dashboard-menu',
  standalone: true,
  imports: [MessagesComponent,FormsModule, CommonModule,PatientsComponent],
  templateUrl: './dashboard-menu.component.html',
  styleUrl: './dashboard-menu.component.css'
})
export class DashboardMenuComponent {
  active: string = 'messages';

  onMessagesTab(): void {
    this.active = 'messages';
  }

  onPatientsTab(): void {
    this.active = 'patients';
  }
}