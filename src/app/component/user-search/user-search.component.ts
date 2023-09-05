import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable, from, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from 'src/app/services/user.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';




/**
 * @title Highlight the first autocomplete option
 */
@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    CommonModule,
    BrowserModule
  ],
})
export class UserSearchComponent implements OnInit {
  query = new FormControl('');
  //elements that needs to be fill with data
  options: any[] = [];
  filteredOptions!: Observable<any[]>;
  sessionid="";
  favoritesList:any[]=[];
  constructor(private userService: UserService,private favorites: FavoritesService){

  }
  ngOnInit() {      
    this.sessionid=crypto.randomUUID()
  }
  search(){
    const query=this.query.value
    if (query && query.length>3){      
      (this.userService.SearchUser(query)).subscribe( (rest:any) => {
        const result:any[] = rest.map((x:any) => JSON.parse(x))        
        this.filteredOptions = of([...result])
        console.log(result)
      })      
    }
    
  }
  displayFn(option: any): string {
    return option&& option.name ? option.name : '';
  }
  async jump(option:any){
    console.log(option)
    const body= {
    "session_id":this.sessionid,
    "user_name":option.option.value.username,
    "name":option.option.value.name,
    "professional_headline":option.option.value.professionalHeadline,
    "img_url":option.option.value.imageUrl
    }
    window.open(`https://torre.ai/${option.username}`,"_blank")
    await this.favorites.saveFavorite(body)
    this.getFavoritesId(this.sessionid)
    
  }
  async getFavoritesId(option:any){
    this.favoritesList= await this.favorites.getFavoriteSessionId(option)
    console.log(this.favoritesList)
  }
  async removeFav(option:any){
    await this.favorites.removeFav(option.favorite_id)
    this.getFavoritesId(this.sessionid)
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
