import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  createInfo: FormGroup;
  submitted = false;
  emailPattern: any =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(private fb: FormBuilder, private _examenService: ExamenService) {
    this.createInfo = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(21)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      categoria: ['', Validators.required],
      horario: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      estado: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  agregarInfo() {
    this.submitted = true;

    if (this.createInfo.invalid) {
      return;
    }
    const createInfo: any = {
      nombre: this.createInfo.value.nombre,
      edad: this.createInfo.value.edad,
      email: this.createInfo.value.email,
      categoria: this.createInfo.value.categoria,
      horario: this.createInfo.value.horario,
      descripcion: this.createInfo.value.descripcion,
      estado: this.createInfo.value.estado,
    };

    this._examenService
      .agregarInfo(createInfo)
      .then(() => {
        console.log('Los datos han sido agregados con éxito');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
