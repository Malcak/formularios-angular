import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'Manuel',
    apellido: 'Castaño',
    correo: 'Manuel@email.com',
    pais: 'COL',
    genero: 'M',
  };

  paises: any[] = [];

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    this.paisService.getPaises().subscribe((paises) => {
      this.paises = paises;
      this.paises.unshift({
        nombre: 'Seleccione un pais',
        codigo: '',
      });
    });
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }
    console.log(form.controls);
  }
}
