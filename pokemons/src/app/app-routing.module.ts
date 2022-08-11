import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FavouritePokemonsComponent } from './components/favourite-pokemons/favourite-pokemons.component';
import { ListPokemonsComponent } from './components/list-pokemons/list-pokemons.component';
import { DetailsPokemonComponent } from './components/details-pokemon/details-pokemon.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/list-pokemons/1', pathMatch: 'full', },
  { path: 'favourite-pokemons', component: FavouritePokemonsComponent},
  { path: 'list-pokemons/:id', component: ListPokemonsComponent},
  { path: 'details-pokemon', component: DetailsPokemonComponent},
  // { path: '*', component: ListPokemonsComponent},
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule { }
