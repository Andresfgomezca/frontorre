import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { FavoritesComponent } from './component/favorites/favorites.component';
import { UserGenomaComponent } from './component/user-genoma/user-genoma.component';
import { UserSearchComponent } from './component/user-search/user-search.component';

const routes: Routes = [{path: 'home',component: HomeComponent},
{path: 'favorites',component: FavoritesComponent},
{path: 'user-genoma',component: UserGenomaComponent},
{path: 'user-search',component: UserSearchComponent},
{path:'**',component:HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
