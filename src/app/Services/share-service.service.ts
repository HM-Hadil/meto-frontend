import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";
import {TypeChirurgie} from "../Models/typeChirurgie/type-chirurgie";
import {environment} from "../../environments/environment";
import { PatientModel } from '../Models/PatientModel';
import { MedecinModel } from '../Models/MedecinModel';
import { AdminModel } from '../Models/AdminModel';
import { Authentication } from '../Models/Authentication';

@Injectable({
  providedIn: 'root'
})
export class ShareServiceService {
  Url = 'http://localhost:8800/chirurgies/GetChirurgieById';
 urlPut='http://localhost:8800/chirurgies/UpdateChirurgie';
 UrlDr = "http://localhost:8800/accounts/doctor";
  UrlDelete = "http://localhost:8800/accounts/deleteAccount"
  UrlActivate = "http://localhost:8800/accounts/activateAccount"



  private _refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private http: HttpClient) { }


  // Add chirurgie

  AddChirurgie(chirurgie: TypeChirurgie):Observable<any>{
  return this.http.post(environment.api+"chirurgies/addChirurgie",chirurgie).pipe(
    tap(()=>{
      this._refreshrequired.next()
    })
  );
}

  //Get chirurgie By Id

  getChirurgirById(id : number):Observable<TypeChirurgie>{
    return this.http.get<TypeChirurgie>(`${this.Url}/${id}`);
  }

  //Get All chirurgie

  getAllChirurgie():Observable<TypeChirurgie[]>{
    return this.http.get<TypeChirurgie[]>(environment.api+"chirurgies/getAllChirurgie");
  }

  //Update Chirurgie by id

  updateChirurgie(id : number , chirurgie : TypeChirurgie):Observable<Object>{
    return this.http.put(`${this.urlPut}/${id}`,chirurgie, ).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );
  }

  //delete Chirurgie
  deleteChirurgie(id:number):Observable<any>{
    return this.http.delete(environment.api+'chirurgies/DeleteChirurgie/'+id).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );
  }



//add patient
    signUpPatient(usersP : PatientModel):Observable<any>{
      return this.http.post(environment.api+"register/patient",usersP);

    }

    //add medecins
    signUpMedecin(usersM : MedecinModel):Observable<any>{
      return this.http.post(environment.api+"register/doctor",usersM);

    }

      //add admin
      signUpAdmin(usersA : AdminModel):Observable<any>{
        return this.http.post(environment.api+"register/admin",usersA);
      }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(`http://localhost:8800/register/checkEmailExists/${email}`);
  }

      //login
     login(request : Authentication):Observable<any>{
      return this.http.post(environment.api+"authenticate",request);
     }

     // get all accounts doctors
     getDisableddoctor():Observable<MedecinModel[]>{
    return  this.http.get<MedecinModel[]>(environment.api+"accounts/disabledDoctor");
     }

  // get all accounts patients
  getDisabledPatient():Observable<PatientModel[]>{
    return  this.http.get<PatientModel[]>(environment.api+"accounts/disabledPatient");
  }
     //get account doctor by id
     getDoctorByIdAndEnabledFalse(id: number):Observable<MedecinModel>{
    return  this.http.get<MedecinModel>(`${this.UrlDr}/${id}`);

  }

  //delete Account
  deleteAccount(id : number):Observable<any>{
    return this.http.delete(`${this.UrlDelete}/${id}`);
  }

  //activate accounts patient
  activateAccountPatient(id: number):Observable<PatientModel>{
    return this.http.put<PatientModel>(`${this.UrlActivate}/${id}`, null);
  }

  //activate accounts doctor
  activateAccountDoctor(id: number):Observable<MedecinModel>{
    return this.http.put<MedecinModel>(`${this.UrlActivate}/${id}`, null);
  }


}
