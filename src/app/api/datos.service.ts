import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(environment.url);
  }
  getGovierno() {
    return this.http.get('https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=Antioquia');
  }
}
