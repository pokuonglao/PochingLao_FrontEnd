import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Messages } from '../../messages';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgFor],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  data: Messages[] = [];
  errorMessage: string = '';
  displayedMessages: Messages[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthToken()
    });

    this.http.get<Messages[]>("https://d129impgfwqu0k.cloudfront.net/pochinglao/messages/getMessages", { headers }).subscribe(
      (response: Messages[]) => {
        this.data = response;
        this.updateDisplayedMessages();
        console.log('Data received:', this.data);
      },
      (error) => {
        this.errorMessage = 'Error fetching data: ' + error.message;
        console.error('Error fetching data:', error);
      }
    );
  }

  updateDisplayedMessages(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedMessages = this.data.slice(startIndex, endIndex);
  }

  searchMessages(): void {
    // Filter messages based on searchQuery
    // Update displayedMessages array
    // Implement logic to handle pagination if needed
  }

  prevPage(): void {
    // Navigate to previous page if available
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedMessages();
    }
  }

  nextPage(): void {
    // Navigate to next page if available
    if (this.currentPage < this.data.length / this.pageSize) {
      this.currentPage++;
      this.updateDisplayedMessages();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedMessages();
  }

  viewMessageDetails(message: Messages): void {
    // Implement logic to display message details
  }

  getTruncatedMessage(message: string): string {
    const maxLength = 50;
    return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }
}
