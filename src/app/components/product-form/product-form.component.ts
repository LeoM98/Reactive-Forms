import { Component, OnInit } from '@angular/core';
/**Angular trae sus propias validaciones, para eso el validator. */
import {FormControl, Validators} from '@angular/forms';
/**Es para hacer espera en lo que se escucha el ingreso del input */
import {debounceTime} from 'rxjs/operators'


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  /**Cada FormControl tiene un valor por defecto y validaciones síncronas y asíncronas son arrays
   * Asíncronas: Piden info al servidor, se valida y se determina si el campo es válido o no...
   * Es algo similar cuando te dicen que el usuario existe o no.
   * Las Síncronas son las que solo validan que el valor ingresado sea válido o no, no hacen consultas a web servers
   */
  emailCtrl = new FormControl('',[Validators.required,Validators.maxLength(30),Validators.minLength(10)]); /**El campo es requerido */
  /**La variable de arriba posee un grupo de validaciones*/
  constructor() {
    /**Esto se hace para estar validando a cada instante y no depender de un submit del usuario
     * Esd decir, se está escuchando
     * el pipe es un proceso y el 1000 son milisegundos, es un tiempo de inactividad en lo que el usuario termina de teclar o termine
     */
    this.emailCtrl.valueChanges.pipe(debounceTime(1000)).subscribe(value=>console.log(value));
   }
  ngOnInit(): void {
  }

  getEmail(event: Event){
    event.preventDefault();
    console.log(this.emailCtrl.value);
  }

}
