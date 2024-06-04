import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  constructor() {
    axios.defaults.baseURL = "http://localhost:8080";
    axios.defaults.headers['Content-Type'] = "application/json";
  }
}
