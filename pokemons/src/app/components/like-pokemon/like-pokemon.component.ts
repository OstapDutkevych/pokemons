import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE } from 'src/app/enums/constants';
import { ItemPokemon, PokemonModel } from 'src/app/interfaces/pokemon';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
    selector: 'app-like-pokemon',
    templateUrl: './like-pokemon.component.html',
    styleUrls: ['./like-pokemon.component.css']
})
export class LikePokemonComponent {
    @Input()
    index!: number;

    @Input()
    pokemon!: ItemPokemon;

    constructor(private localStorageService: LocalStorageService) { }

    addToFavourites(pokemon: ItemPokemon ) {
        const favouritesPokemons: string = this.localStorageService.getData(LOCAL_STORAGE.FAVOURITE_POKEMONS)!
        const parsedFavouritePokemons: ItemPokemon[] = JSON.parse(favouritesPokemons)

        if (parsedFavouritePokemons?.length) {
            const isFavouritePokemon = this.isFavouritePokemon(pokemon, parsedFavouritePokemons);
            if (isFavouritePokemon) {
                const updatedFavPokemons = parsedFavouritePokemons.filter((item: ItemPokemon) => {
                    return item.name !== isFavouritePokemon.name
                })
                    this.saveToLocalStorage(
                        LOCAL_STORAGE.FAVOURITE_POKEMONS,
                        updatedFavPokemons)
            } else {
                this.saveToLocalStorage(
                    LOCAL_STORAGE.FAVOURITE_POKEMONS,
                    [...parsedFavouritePokemons, pokemon])
            }
        } else {
            this.saveToLocalStorage(LOCAL_STORAGE.FAVOURITE_POKEMONS, [pokemon])
        }
    }

    saveToLocalStorage(key: string, item: ItemPokemon[] | PokemonModel[]) {
        this.localStorageService.saveData(key, JSON.stringify(item))
    }

    isFavouritePokemon(pokemon: ItemPokemon, allFavourites: ItemPokemon[]) {
        if (allFavourites) {
            const foundItem = allFavourites.find((item: ItemPokemon) => {
                return item.name === pokemon.name;
            })
            return foundItem;
        }
        return false;

    }
}
