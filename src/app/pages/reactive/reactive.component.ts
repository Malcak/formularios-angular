import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validadores: ValidadoresService
  ) {
    this.crearFormulario();
    this.cargarDataAlForm();
    this.crearListeners();
  }

  ngOnInit(): void {}

  get pasatiempos() {
    return this.form.get('pasatiempos') as FormArray;
  }

  campoNoValido(campo: string): boolean {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

  pass2Novalido() {
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;
    return pass1 === pass2 ? false : true;
  }

  crearFormulario() {
    this.form = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(5)]],
        apellido: ['', [Validators.required, this.validadores.noHerrera]],
        correo: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        usuario: ['', , this.validadores.existeUsuario],
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        direccion: this.fb.group({
          distrito: ['', Validators.required],
          ciudad: ['', Validators.required],
        }),
        pasatiempos: this.fb.array([]),
      },
      {
        validators: [this.validadores.passwordsIguales('pass1', 'pass2')],
      }
    );
  }

  crearListeners() {
    // this.form.valueChanges.subscribe((valor) => {
    //   console.log(valor);
    // });

    // this.form.statusChanges.subscribe((status) => {
    //   console.log(status);
    // });
    this.form.get('nombre').valueChanges.subscribe((valor) => {
      console.log(valor);
    });
  }

  cargarDataAlForm() {
    this.form.reset({
      nombre: 'Fernando',
      apellido: 'Herrero',
      correo: 'Fernando@gmail.com',
      direccion: {
        distrito: 'Ontario',
        ciudad: 'Ottawa',
      },
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('', Validators.required));
  }

  borrarPasatiempo(index: number) {
    this.pasatiempos.removeAt(index);
  }

  guardar() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((subControl) =>
            subControl.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
      return;
    }
    console.log(this.form);
    this.form.reset();
  }
}
