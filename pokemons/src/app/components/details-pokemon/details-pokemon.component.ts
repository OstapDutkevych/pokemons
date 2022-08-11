import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LOCAL_STORAGE } from 'src/app/enums/constants';
import { ItemPokemon, PokemonModel } from 'src/app/interfaces/pokemon';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
    selector: 'app-details-pokemon',
    templateUrl: './details-pokemon.component.html',
    styleUrls: ['./details-pokemon.component.css']
})
export class DetailsPokemonComponent implements OnInit {

    // currentPokemon!: PokemonModel & ItemPokemon;
    currentPokemon!: any;

    constructor(private pokemonService: PokemonsService,
        private localStorageService: LocalStorageService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.initData()
    }

    initData() {
        const name = this.activatedRoute.snapshot.params['name']
        this.pokemonService.getPokemonDetailsByName(name).subscribe((res: PokemonModel ) => {
            if (res) {
                this.currentPokemon = res;
                this.checkFavouritesPokemon()
                this.localStorageService.saveData(LOCAL_STORAGE.SELECTED_POKEMON, JSON.stringify(res))
            }
        })
    }

    checkFavouritesPokemon() {
        const allFavPokemons: any = this.localStorageService.getData(LOCAL_STORAGE.FAVOURITE_POKEMONS)
        const parsedAllFavPokemons: any = JSON.parse(allFavPokemons)
        if (parsedAllFavPokemons?.length) {
            const isFavPokemons = parsedAllFavPokemons.find((item: ItemPokemon) => item.name === this.currentPokemon.name)
            if (isFavPokemons) {
                this.currentPokemon.favourite = true;
            }

        }
    }

}
