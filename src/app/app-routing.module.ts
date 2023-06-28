import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MovieinfoComponent } from './home/movielist/movieinfo/movieinfo.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ShowInfoComponent } from './show/show-info/show-info.component';
import { NewShowComponent } from './new-show/new-show.component';
import { NewBookingComponent } from './booking/new-booking/new-booking.component';
import { BookingHistoryComponent } from './booking/booking-history/booking-history.component';
import { WalletComponent } from './wallet/wallet.component';
import { UserComponent } from './user/user.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent},
  {path: "movie/:id", component: MovieinfoComponent},
  {path: "new-movie", component: NewMovieComponent},
  {path: "error", component: ErrorPageComponent},
  {path: "show/:id", component: ShowInfoComponent},
  {path: "new-show", component: NewShowComponent},
  {path: "book", component: NewBookingComponent},
  {path: "book-audit", component: BookingHistoryComponent},
  {path: "wallet", component: WalletComponent},
  {path: "user", component: UserComponent},
  {path: "edit-movie/:id", component: EditMovieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
