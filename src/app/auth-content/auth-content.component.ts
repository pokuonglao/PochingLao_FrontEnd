import { Component,OnInit } from '@angular/core';
import { NgFor } from '@angular/common'; 
import { LoginFormComponent } from '../login-form/login-form.component';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-auth-content',
  standalone: true,
  imports: [ NgFor,LoginFormComponent],
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent implements OnInit {
  data: string[] = [];

  constructor(private axiosService: AxiosService) { }

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      "/messages",
      {}
    ).then(
      (response) => this.data = response.data
    );
  }
}
