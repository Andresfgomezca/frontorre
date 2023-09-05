import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable, from, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from 'src/app/services/user.service';


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
  ],
})
export class UserSearchComponent implements OnInit {
  query = new FormControl('');
  //elements that needs to be fill with data
  options: any[] = [];
  filteredOptions!: Observable<any[]>;
  constructor(private userService: UserService){

  }
  ngOnInit() {      
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
  jump(option:any){
    console.log(option.username)
    window.open(`https://torre.ai/${option.username}`,"_blank")
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
