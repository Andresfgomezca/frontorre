import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http:HttpClient) { }

  saveFavorite(object:any){
    const url="https://torre-7xbi.onrender.com/favorites";
    

    return firstValueFrom(this.http.post(url,object))   
  }
  getFavoriteId(object:any){
    const url="https://torre-7xbi.onrender.com/favorites";
    

    return firstValueFrom(this.http.get(`${url}${object}`))   
  }
  getFavoriteSessionId(object:any){
    const url=`https://torre-7xbi.onrender.com/favorites/by-session/${object}`;
    

    return firstValueFrom(this.http.get<any[]>(url))   
  }
  removeFav(option:any){
    
    const url=`https://torre-7xbi.onrender.com/favorites/${option}`; //this method removes by favorite id
    return firstValueFrom(this.http.delete(url))
  }
}
