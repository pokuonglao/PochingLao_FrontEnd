import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ContentComponent } from './content/content.component';
import { ShopComponent } from './shop/shop.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
   { path: 'about', component: AboutComponent },
   { path: 'contact', component: ContactComponent },
   { path: 'content', component: ContentComponent },
   { path: 'shop', component: ShopComponent },
];
