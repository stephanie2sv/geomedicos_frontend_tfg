import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Cita } from '../interfaces/cita';
import { MockApiService } from './mock-api.service';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private mockApiService: MockApiService){}

  getCitas():Observable<Cita[]>{
    console.log('llamando a getCitas()...');
    return this.mockApiService.getCitas();
  }

// private apiUrlCitas=''
// private apiUrlPacientes=''

//   constructor(private http:HttpClient) { }

// getCitas():Observable<Cita[]>{
//   return this.http.get<Cita[]>(this.apiUrlCitas).pipe(
//     map(citas=>{
//       const peticionesPacientes=citas.map(cita=>
//         this.http.get<IUser>(`${this.apiUrlPacientes}${cita.idPaciente}`)
//       );

//       return forkJoin(peticionesPacientes).pipe(
//         map(pacientes=>{
//           return citas.map((cita,index)=>({
//             ...cita,
//             pacienteNombre:pacientes[index].nombre
//           }));
//         })
//       );
//     }),
//     switchMap(citasActualizadas$=>citasActualizadas$)
//   )
// }
}
