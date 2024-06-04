import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AxiosService } from '../axios.service';
import { ContentComponent } from '../content/content.component';

@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AxiosService
  ],
  bootstrap: []
})
export class AppModule { }
