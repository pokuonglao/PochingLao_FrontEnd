import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgbCarouselModule,CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
   // Define your images array with actual data
   images = [
    { url: '/IMG4076.jpg', alt: 'Image 2 Alt Text', label: '', description: 'Poching and her peers' },
    { url: '/IMG4080.jpg', alt: 'Image 3 Alt Text', label: '', description: 'Poching caring for patient' },
    { url: '/IMG4081.jpg', alt: 'Image 1 Alt Text', label: '', description: 'Poching taking data for patient' },
    { url: '/IMG4086.jpg', alt: 'Image 2 Alt Text', label: '', description: 'Poching keeping a child company' },
    { url: '/IMG4088.jpg', alt: 'Image 3 Alt Text', label: '', description: 'Poching taking data for patient' }
  ];
}