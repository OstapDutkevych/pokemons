import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private resetLocalStorage = new Subject();
  constructor() { }
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  resetLocalSorageSubject(){
    return this.resetLocalStorage.asObservable();
  }

  onResetLocalStorage(){
    this.resetLocalStorage.next(true)
  }
}
