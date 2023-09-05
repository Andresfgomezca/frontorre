import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient)  { 

  }
  SearchUser(query:string){
    const url:string ='https://torre.ai/api/entities/_searchStream';
    const body= {
      "query": query,
      "identityType": "person",
      "meta": false,
      "limit": 10,
      "excludeContacts": true,
      "excludedPeople": []
    }
    return this.http.post(url,body,{observe: 'events', responseType: 'text', reportProgress: true}) 
    .pipe(      
          filter((e:any) => e.type === 3 && e.partialText),      
          map((e:any) => {
            const partials = e.partialText.trim().split('\n');
            console.log(partials)            
            return partials;
          },map((e:any)=>{
            const response = e.map( (x:any) => JSON.parse(x.replace(/\"/g)) )
            return response
          }))
        );
    
    
  }
}
