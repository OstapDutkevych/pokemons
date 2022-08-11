import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FavouritePokemonsComponent } from './components/favourite-pokemons/favourite-pokemons.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ListPokemonsComponent } from './components/list-pokemons/list-pokemons.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HttpErrorInterceptor } from './interceptor/http-error.interceptor';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { DetailsPokemonComponent } from './components/details-pokemon/details-pokemon.component';
import { LikePokemonComponent } from './components/like-pokemon/like-pokemon.component';
import { StatsPokemonComponent } from './components/stats-pokemon/stats-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FavouritePokemonsComponent,
    ListPokemonsComponent,
    SpinnerComponent,
    PokemonCardComponent,
    DetailsPokemonComponent,
    LikePokemonComponent,
    StatsPokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
 
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
