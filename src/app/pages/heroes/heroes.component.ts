import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { HeroeModel } from '../../models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes : HeroeModel[] = [];
  cargando = false;

  constructor( private heroesServices:HeroesService ) {  }

  ngOnInit(): void {

    this.cargando = true;
    this.heroesServices.getHeroes().subscribe( resp => {
      this.heroes = resp;
      this.cargando = false;
    });

  }

  borrarHeroe( heroe : any, i: number ){


    Swal.fire({
      
      title: '¿Estas seguro?',
      text: `¿Estas seguro que deseas eliminar a ${ heroe.nombre }?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if( resp.value ){
        this.heroes.splice( i, 1 )    
        this.heroesServices.borrarHeroeEdit( heroe.id ).subscribe();
      }
    } )

    

  }

  

}
