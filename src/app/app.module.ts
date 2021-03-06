import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ShortenerComponent } from './shortener/shortener.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ShorteningDetailComponent } from './shortener/shortening-detail/shortening-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShorteningFilterPipe } from './shortener/shortening-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    ShortenerComponent,
    SpinnerComponent,
    ShorteningDetailComponent,
    PageNotFoundComponent,
    ShorteningFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
