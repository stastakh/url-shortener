import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShortenerComponent } from './shortener/shortener.component';
import { ShorteningDetailComponent } from './shortener/shortening-detail/shortening-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'shortener', component: ShortenerComponent },
  { path: 'shortener/:id', component: ShorteningDetailComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
