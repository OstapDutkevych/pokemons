import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private router: Router, 
    private localStorageService:LocalStorageService){}

  navigateToListsPokemon(){
    localStorage.clear();
    this.localStorageService.onResetLocalStorage()
  }

  clickOnPokemonList(){
    this.router.navigate(["/list-pokemons", 1])
    const currPage = { offset:  15, limit: 15, page: 1 }
    localStorage.setItem('pagination_list', JSON.stringify(currPage))
  }
}
