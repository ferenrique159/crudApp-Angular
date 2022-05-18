import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from "rxjs/operators";

// "Delay" lo que hace es ayudar a relantizar el proceso de carga de un objeto, en este caso lo utilizaremos para ayudar a mostrar el alert de cargando

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-8244e-default-rtdb.firebaseio.com'

  constructor( private http: HttpClient ) {  
    
  }  

  crearHeroe( heroe: HeroeModel ){

    return this.http.post(`${ this.url }/heroes.json`, heroe ).pipe( map( (resp:any) => { 
      heroe.id = resp.name;
      return heroe; }) );
  }

  actualizarHeroe( heroe: HeroeModel ){

    const heroTemp = {
      ...heroe
    };

    delete heroTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroTemp )

  }

  borrarHeroeEdit( id: string ){
    return this.http.delete( `${ this.url }/heroes/${ id }.json` )
  }

  getHeroeEdit( id: string ){
    return this.http.get( `${ this.url }/heroes/${ id }.json` )
  }

  getHeroes(){
    return this.http.get(`${ this.url}/heroes.json`).pipe( map ( this.crearArreglo ),
    delay(0)
     );
  }

  private crearArreglo( heroesObject: any ){

    const heroes: HeroeModel[] =[];

    if ( heroesObject === null ) { return []; }

    Object.keys( heroesObject ).forEach( key => {

      const heroe : HeroeModel = heroesObject[key];
      heroe.id = key;

      heroes.push( heroe )

    } )


    return heroes;

  }

}
