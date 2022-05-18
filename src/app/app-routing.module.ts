import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroeEditComponent } from './pages/heroe-edit/heroe-edit.component';
import { HeroesComponent } from './pages/heroes/heroes.component';


const routes : Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroeEdit/:id', component: HeroeEditComponent },
  { path: '**', pathMatch:'full', redirectTo: 'heroes' },
]

@NgModule({
  imports: [ RouterModule.forRoot (routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
