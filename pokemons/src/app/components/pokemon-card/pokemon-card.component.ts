import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ItemPokemon } from 'src/app/interfaces/pokemon';
interface PokemonFavourite {
    pokemon: any;
    index: number
}

@Component({
    selector: 'app-pokemon-card',
    templateUrl: './pokemon-card.component.html',
    styleUrls: ['./pokemon-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PokemonCardComponent implements OnInit {
    @Input()
    pokemon!: ItemPokemon & any;

    @Input()
    index!: number;

    srcImage!: string;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        if (this.pokemon?.image) {
            this.srcImage = this.pokemon?.image
        } else {
            this.srcImage = this.pokemon?.sprites?.other?.dream_world?.front_default;
        }
    }

    showDetailPokemon(pokemon: ItemPokemon) {
        this.router.navigate(['details-pokemon', { name: pokemon.name }])
    }
}
