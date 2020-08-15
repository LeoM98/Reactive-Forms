import { Component, OnInit } from '@angular/core';
/**Angular trae sus propias validaciones, para eso el validator. */
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
/**Es para hacer espera en lo que se escucha el ingreso del input */
import {debounceTime} from 'rxjs/operators'

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  form:FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  /**Como puede observarse en este metodo se está instanciando un form-group que contendrá muchos form-control
   */
  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['',  [Validators.required]],
      date: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      text: ['', [Validators.required, Validators.maxLength(80)]],
      category: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
    /* this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      text: new FormControl('', [Validators.maxLength(200)]),
      category: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    }); */

    /* this.form.valueChanges.pipe(debounceTime(1000))
    .subscribe(value => {
      console.log(value);
    }); */
  }


  save(event: Event){
    /**El prevent es para evitar recargar toda la página */
    event.preventDefault();
    if(this.form.valid){
      /**Se obtiene todo el valor del formulario y con el log se imprime. */
      const value = this.form.value;
      console.log(value);
    }else{
      this.form.markAllAsTouched();
    }
  }

  get EmailField(){
    return this.form.get('email');
  }

  get textField(){
    return this.form.get('text')
  }

  get emailFieldIsInvalid(){
    return this.EmailField.invalid && this.EmailField.touched;
  }

  get textFieldIsInvalid(){
    return this.textField.invalid && this.textField.touched;
  }

  get emailFieldIsValid(){
    return this.EmailField.valid && this.EmailField.touched;
  }

  get textFieldIsValid(){
    return this.textField.valid && this.textField.touched;
  }

}
