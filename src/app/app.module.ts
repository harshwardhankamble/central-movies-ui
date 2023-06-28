import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { MovielistComponent } from './home/movielist/movielist.component';
import { MovieinfoComponent } from './home/movielist/movieinfo/movieinfo.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ShowComponent } from './show/show.component';
import { NewShowComponent } from './new-show/new-show.component';
import { ShowInfoComponent } from './show/show-info/show-info.component';
import { BookingComponent } from './booking/booking.component';
import { NewBookingComponent } from './booking/new-booking/new-booking.component';
import { BookingHistoryComponent } from './booking/booking-history/booking-history.component';
import { WalletComponent } from './wallet/wallet.component';
import { UserComponent } from './user/user.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    MovielistComponent,
    MovieinfoComponent,
    NewMovieComponent,
    ErrorPageComponent,
    ShowComponent,
    NewShowComponent,
    ShowInfoComponent,
    BookingComponent,
    NewBookingComponent,
    BookingHistoryComponent,
    WalletComponent,
    UserComponent,
    EditMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token')
      }
    })
  ],
  providers: [CookieService, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
