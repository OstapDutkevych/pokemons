import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { API } from '../enums/constants';
import { Form, PokemonModel } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  public originalAllPokemons:PokemonModel[] = []
  public resultPokemos!: any;

  constructor(public http: HttpClient) { }

  getAllPokemons(offset:number, limit:number): Observable<any> {
    return this.http.get(`${API.POKEMON}/pokemon?offset=${offset}&limit=${limit}`).pipe(
      switchMap((pokemons:any)=> {
          this.resultPokemos = pokemons;
          const result$ = pokemons.results.map((item:Form) => 
          this.getPokemonDetailsByName(item.name));
          return combineLatest(result$);
      })
    )  
  }

  getPokemonDetailsByName(name:string):Observable<any>{
    return this.http.get(`${API.POKEMON}/pokemon/${name}`)
 }
}
