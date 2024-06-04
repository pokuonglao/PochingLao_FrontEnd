import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  componentToShow: string ="welcome";
  constructor(private axiosService: AxiosService) { }
}
