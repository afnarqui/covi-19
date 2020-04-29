import { Component, OnInit, ViewChild, ElementRef,   } from '@angular/core';
import { DatosService } from '../api/datos.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public data = [];
  public dataColombia = [];
  // @ViewChild('barcanvas', {static: false}) barChart;
  @ViewChild("barCanvas", {static: false}) barCanvas: ElementRef;

  private barChart: Chart;
  bars: any;
  colorArray: any;
  estados = [];
  valoresAntioquia = [];
  estadosCiudades = [];
  ciudadesCasos = []
  ciudades = [
    { nombre:'Amagá'},
    { nombre:'Andes'},
    { nombre:'Angostura'},
    { nombre:'Apartadó'}, 
    { nombre:'Barbosa'},
    { nombre:'Bello'},
    { nombre:'Caldas'}, 
    { nombre:'Cocorná'},
    { nombre:'Copacabana'}, 
    { nombre:'Donmatías'},
    { nombre:'El Santuario'}, 
    { nombre:'Envigado'},
    { nombre:'Frontino'},
    { nombre:'Granada'},
    { nombre:'Guarne'},
    { nombre:'Guatapé'},
    { nombre:'Itagüí'},
    { nombre:'La Ceja'},
    { nombre:'La Estrella'}, 
    { nombre:'Medellín'},
    { nombre:'Montebello'}, 
    { nombre:'Retiro'},
    { nombre:'Rionegro'}, 
    { nombre:'Sabaneta'},
    { nombre:'San Francisco'}, 
    { nombre:'San Pedro de Urabá'}, 
    { nombre:'Santa Rosa de Osos'},
    { nombre:'Sonsón'}
  ]

  constructor(private service: DatosService) {}
  ionViewDidEnter() {
    this.createBarChart();
  }
  createBarChart() {
    // nativeElement
    this.buscarValores();
  }
  ngOnInit() {


    let datos = {
    }

    this.service.getData()
      .subscribe((items: any)=> {
        // active: 328
        // cases: 364
        // casesPerOneMillion: 123
        // continent: "North America"
        // country: "Jamaica"
        // countryInfo: {_id: 388, iso2: "JM", iso3: "JAM", lat: 18.25, long: -77.5, …}
        // critical: 3
        // deaths: 7
        // deathsPerOneMillion: 2
        // recovered: 29
        // tests: 3621
        // testsPerOneMillion: 1223
        // todayCases: 0
        // todayDeaths: 0
        // updated: 1588123362590
        let valores =  items.filter(e => e.country.indexOf('Colombia') != -1)
        this.dataColombia = valores;
        // this.data = items;
      });
      // this.data = datos;
      // console.log(datos);
  }

  buscarValores() {
    this.service.getGovierno()
    .subscribe((items: any)=>{
      // console.log(items)
      let fecha = new Date();
      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let ano = fecha.getFullYear()
      let fechanueva = JSON.stringify(ano) + '-' + JSON.stringify(mes) + '-' + JSON.stringify(dia) + 'T00:00:00.000'
      // let valores =  items.filter(e => e.fecha_diagnostico.indexOf('2020-04-28T00:00:00.000') != -1)
     
      // let valoress =  valores.reduce(e => e.edad.indexOf('74') != -1)
      // console.log(valoress);

      //let valores =  items.filter(e => e.ciudad_de_ubicaci_n.indexOf('Medellín') != -1)
      let estados = this.groupBy(items,'estado')
      this.estados = estados;


      // let valoresCiudades =  items.filter(e => e.ciudad_de_ubicaci_n.indexOf('Medellín') != -1)
      // let val = valoresCiudades
      // let ciudad_de_ubicaci_n = this.groupBy(val,'ciudad_de_ubicaci_n')
      // debugger
      // let ciudad_de_ubicaci_nn = ciudad_de_ubicaci_n['Medellín']
      // let estadosCiudades = this.groupBy(ciudad_de_ubicaci_nn,'estado');
      // this.estadosCiudades = estadosCiudades;
      // console.log(estadosCiudades);


      // let ciudad_de_ubicaci_n = this.groupBy(items,'ciudad_de_ubicaci_n')
      // let ciudadesDistribuidas = ciudad_de_ubicaci_n;
      // console.log(ciudadesDistribuidas);
      for(let i =0; i < this.ciudades.length;i++){
        let nombre = this.ciudades[i].nombre;
        let valoresCiudades =  items.filter(e => e.ciudad_de_ubicaci_n.indexOf(nombre) != -1)
        let estadosCiudades = this.groupBy(valoresCiudades,'estado');
        this.ciudadesCasos.push({
          nombre,
          deaths: estadosCiudades['Fallecido'] === undefined ? 0 : estadosCiudades['Fallecido'].length,
          critical:estadosCiudades['Grave'] === undefined ? 0 : estadosCiudades['Grave'].length,
          recovered:estadosCiudades['Leve'] === undefined ? 0 : estadosCiudades['Leve'].length,
          cases:estadosCiudades['Moderado'] === undefined ? 0 : estadosCiudades['Moderado'].length
         })
      }
    
      let valores = []
      let Fallecido = this.estados['Fallecido'].length;
      let Grave = this.estados['Grave'].length;
      let Leve = this.estados['Leve'].length;
      let Moderado = this.estados['Moderado'].length;
      valores.push(Fallecido)
      valores.push(Grave)
      valores.push(Leve)
      valores.push(Moderado)
      this.valoresAntioquia.push({
        'deaths':Fallecido,
        'critical':Grave,
        'recovered':Leve,
        'cases':Moderado
      })
    
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: "bar",
        data: {
          labels: ["Fallecido","Grave","Leve","Moderado"],
          datasets: [
            {
              label:'Estados Antioquia',
              data: valores,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });

    });
  }

  groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

}
