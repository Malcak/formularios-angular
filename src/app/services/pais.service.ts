import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  constructor(private http: HttpClient) {}

  getPaises() {
    return this.http
      .get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        map((res: any[]) =>
          res.map((pais) => ({ nombre: pais.name, codigo: pais.alpha3Code }))
        )
      );
  }
}
