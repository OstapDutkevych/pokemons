import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { LOCAL_STORAGE } from 'src/app/enums/constants';
import { ItemPokemon, PaginationData, PokemonModel } from 'src/app/interfaces/pokemon';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PokemonsService } from 'src/app/services/pokemons.service';


@Component({
    selector: 'app-list-pokemons',
    templateUrl: './list-pokemons.component.html',
    styleUrls: ['./list-pokemons.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListPokemonsComponent implements OnInit, OnDestroy {
    paginationData:PaginationData = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 100
    }
    modifiedAllPokemons: ItemPokemon[] = []
    routeSubscription!: Subscription;
    constructor(
        private pokemonService: PokemonsService, 
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private localStorageService: LocalStorageService,
        private cdRef: ChangeDetectorRef
        ) { }

    ngOnInit(): void { 
        console.log('LIST');
        
         this.localStorageService.resetLocalSorageSubject().subscribe((item)=>{
            this.activePaginationRoute()
        })
         this.activePaginationRoute()
    }
    ngOnDestroy(){
        this.routeSubscription.unsubscribe()
    }

    activePaginationRoute(){
        this.routeSubscription = this.activatedRoute.paramMap.subscribe((item:ParamMap)=>{        
            const paramId = Number(item.get('id')) < 1 ? 1 : Number(item.get('id'))
            if(paramId){
            this.onTableDataChange(paramId);
            }
        })  
    }

    checkFavouritesPokemon() {
        const allFavPokemons: any = this.localStorageService.getData(LOCAL_STORAGE.FAVOURITE_POKEMONS)
        const parsedAllFavPokemons = JSON.parse(allFavPokemons)
        if (parsedAllFavPokemons?.length) {
            this.modifiedAllPokemons=  this.modifiedAllPokemons.map((pokemon) => {
                const isFavPokemons = parsedAllFavPokemons.find((item:ItemPokemon)=> item.name===pokemon.name)
                if (isFavPokemons) {
                    return {
                        ...pokemon,
                        favourite:true
                    }
                }
                return pokemon;
            })
        }
    }

    getAllPokemons({ offset, limit }: { offset: number, limit: number, page: number }) {
            this.pokemonService.getAllPokemons(offset, limit).pipe(take(1)).subscribe((res: PokemonModel[]) => {
                this.pokemonService.originalAllPokemons = res;
                const result = res.map((item: PokemonModel) => {
                    return {
                        image: item.sprites.other.dream_world.front_default,
                        name: item?.forms[0]?.name,
                        url: item.forms[0]?.url
                    }
                })
                this.modifiedAllPokemons = result;
                this.checkFavouritesPokemon()
                this.paginationData.totalItems = this.pokemonService.resultPokemos.count;
                this.cdRef.detectChanges()
            })
            this.cdRef.markForCheck()
    }


    onTableDataChange(event: number) {
        console.log('onTableDataChange');
        
        if (!event) {
            const savedInitPage: any = localStorage.getItem('pagination_list')
            const parsedPageData = JSON.parse(savedInitPage)
            if (!parsedPageData) {
                this.getAllPokemons({ offset: 10, limit: 10, page: 1 })
            } else {
                this.paginationData.currentPage = parsedPageData.page
                this.getAllPokemons(parsedPageData)
            }
        } else {
            this.router.navigate(['/list-pokemons', event])
            this.paginationData.currentPage = event;
            const currPage = { offset: event * 10, limit: 10, page: this.paginationData.currentPage }
            this.getAllPokemons(currPage)
            localStorage.setItem('pagination_list', JSON.stringify(currPage))
        }
    }

    identify(index: number, item: any) {
        return item;
    }
}
