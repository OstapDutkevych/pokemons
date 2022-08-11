import { Component, OnInit, TrackByFunction } from '@angular/core';
import { LOCAL_STORAGE } from 'src/app/enums/constants';
import { ItemPokemon, PokemonModel } from 'src/app/interfaces/pokemon';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-favourite-pokemons',
  templateUrl: './favourite-pokemons.component.html',
  styleUrls: ['./favourite-pokemons.component.css']
})
export class FavouritePokemonsComponent implements OnInit {

  allFavouritePokemons: ItemPokemon[]= [];
  srcImg:any;

  identify: TrackByFunction<ItemPokemon> = (index: number, item: ItemPokemon) => item;

  constructor(
    private localStorageService: LocalStorageService
  ){}

  ngOnInit(): void {
    this.getAllFavPokemons()
    
  }

  getAllFavPokemons(){
    const allFavPokemons: any = this.localStorageService.getData(LOCAL_STORAGE.FAVOURITE_POKEMONS);
    const parsedAllFavPokemons = JSON.parse(allFavPokemons);
    if (parsedAllFavPokemons?.length) {
      this.allFavouritePokemons=  parsedAllFavPokemons.map((pokemon:PokemonModel) => {
              return {
                  ...pokemon,
                  favourite:true
              }
      })
  }
  }
}
