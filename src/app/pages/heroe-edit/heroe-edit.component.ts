import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroe-edit',
  templateUrl: './heroe-edit.component.html',
  styleUrls: ['./heroe-edit.component.css']
})
export class HeroeEditComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroeService: HeroesService, private route: ActivatedRoute ) { }

  

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id') || '' ;

    if( id !== 'nuevo' ){

      this.heroeService.getHeroeEdit( id ).subscribe( (resp: any) => {
        this.heroe = resp;
        this.heroe.id = id;
      } );

    }

    // Aqui coloque que la respuesta fuera tipo any ya que por defecto no se le puede colocar a id un valor null ya que estipo string, entonces para que dejara correr el programa se le inicializa como vacio y en la respuesta no llamo a heroeModel sino que le digo que sera una respuesta tipo any

  }

  

  guardar( form: NgForm ){

    if( form.invalid ){
      console.log(' Formulario no valido ')
      return;
    }

    Swal.fire({
      title: 'Espere',
      text:  'Guardando informacion',
      icon:  'info',
      allowOutsideClick: false
    })
    Swal.showLoading();

    let peticion : Observable<any>;

    if( this.heroe.id ){
      peticion = this.heroeService.actualizarHeroe( this.heroe );
    }else{
      peticion = this.heroeService.crearHeroe( this.heroe );
    }

    peticion.subscribe( resp => {
      
      Swal.fire({
        title: this.heroe.nombre,
        text:  'Se actualizo correctamente',
        icon:  'success'
      })


    });

    

  }

}
