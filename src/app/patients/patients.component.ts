import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Users } from '../../users';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [NgFor],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit{
  data: Users[] = [];
  errorMessage: string = '';
  displayedUsers: Users[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthToken()
    });

    this.http.get<Users[]>("http://localhost:8080/users/getUsers", { headers }).subscribe(
      (response: Users[]) => {
        this.data = response;
        this.updateDisplayedUsers();
        console.log('Data received:');
      },
      (error) => {
        this.errorMessage = 'Error fetching data: ' + error.message;
        console.error('Error fetching data:', error);
      }
    );
  }
  updateDisplayedUsers(): void {
    // Logic to update displayedMessages based on currentPage and pageSize
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedUsers = this.data.slice(startIndex, endIndex);
  }
  viewUserDetails(message: Users): void {
    // Implement logic to display message details
  }
  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }
}
