import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IMedico } from '../interfaces/imedico';
import { IUser } from '../interfaces/iuser';
import { IAdmin } from './../interfaces/iadmin';
import { MockApiService } from './mock-api.service';

@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesService {
 
private mockApi:MockApiService;

constructor(mockApi: MockApiService) {
  this.mockApi = mockApi;  
}

  getDatosPersonalesUser(correo: string) : Observable<IUser>{
    const user = this.mockApi.getUserByEmail(correo);
    return of(user);
  }

  getDatosPersonalesDoctor(correo:string) : Observable<IMedico>{
    const doctor=this.mockApi.getDoctorByEmail(correo);
    return of(doctor);
  }

 

}
