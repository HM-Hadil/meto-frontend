import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, Observable, of, Subject, tap} from "rxjs";
import {TypeChirurgie} from "../Models/typeChirurgie/type-chirurgie";
import {environment} from "../../environments/environment";
import { PatientModel } from '../Models/PatientModel';
import { MedecinModel } from '../Models/MedecinModel';
import { AdminModel } from '../Models/AdminModel';
import { Authentication } from '../Models/Authentication';
import {UserAuthService} from "./interceptor/user-auth.service";
import {catchError} from "rxjs/operators";
import {AppointmentRequest} from "../Models/AppointmentRequest";
import {AppointementResult} from "../Models/AppointementResult";
import {UpdateAppointmentRequest} from "../Models/UpdateAppointmentRequest";
import { AppointmentStatsResult } from '../Models/appointmentStatsResult';
import {updateAppointmentReq} from "../Models/updateAppointmentReq";
import {OpinionRequest} from "../Models/opinion";
import {OpinionResult} from "../Models/opinionResult";
import {DevisReq} from "../Models/DevisReq";
import {UpdatePhotoReq} from "../Models/UpdatePhotoReq";



@Injectable({
  providedIn: 'root'
})
export class ShareServiceService {
  Url = 'http://localhost:8800/chirurgies/GetChirurgieById';
 urlPut='http://localhost:8800/chirurgies/UpdateChirurgie';
 UrlDr = "http://localhost:8800/accounts/doctor";
  UrlDelete = "http://localhost:8800/accounts/deleteAccount"
  UrlActivate = "http://localhost:8800/accounts/activateAccount"
  UrlgetActiveD = "http://localhost:8800/accounts/Activedoctor"
  UrlgetActiveP = "http://localhost:8800/accounts/ActivePatient"
  UrlDesactivateD="http://localhost:8800/accounts/desactivateAccount"
  urlApntmntByDoctor="http://localhost:8800/appointments/getAppointmentByDoctor"
  urlApntmntById="http://localhost:8800/appointments/getAppointmentById"
  urlAffecterMedecin="http://localhost:8800/appointments/affecterMedecin"
  urlRdvPatient="http://localhost:8800/appointments/getAppointmentByPatient"
  api= 'http://localhost:8800/';


  public setIdChirurgie(idChirurgie: string) {
    localStorage.setItem("idChirurgie", JSON.stringify(idChirurgie));
  }

  public getIdChirurgie() {
    return localStorage.getItem("idChirurgie");
  }

  public setIdDoctor(idDoctor :string){
    return localStorage.setItem("idDoctor",JSON.stringify(idDoctor))
  }
  public getIdDoctor(){
    return localStorage.getItem("idDoctor")
  }

  private user!: MedecinModel;
  private errorMessage!: string;
  //without auth
  requestHeader= new HttpHeaders(
  {"No-Auth" :"true"}
);


  private _refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private http: HttpClient, private  userAuthService : UserAuthService) { }

  // Add chirurgie

  AddChirurgie(chirurgie: TypeChirurgie):Observable<any>{
  return this.http.post(this.api+"chirurgies/addChirurgie",chirurgie).pipe(
    tap(()=>{
      this._refreshrequired.next()
    })
  );
}

  //Get chirurgie By Id

  getChirurgirById(id : string):Observable<TypeChirurgie>{
    return this.http.get<TypeChirurgie>(`${this.Url}/${id}`);
  }

  //Get All chirurgie

  getAllChirurgie():Observable<TypeChirurgie[]>{
    return this.http.get<TypeChirurgie[]>(this.api+"chirurgies/getAllChirurgie");
  }

  //Update Chirurgie by id

  updateChirurgie(id: string, chirurgie: TypeChirurgie):Observable<Object>{
    return this.http.put(`${this.urlPut}/${id}`,chirurgie, ).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );
  }

  //delete Chirurgie
  deleteChirurgie(id:number):Observable<any>{
    return this.http.delete(this.api+'chirurgies/DeleteChirurgie/'+id).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );
  }



//add patient
    signUpPatient(usersP : PatientModel):Observable<any>{
      return this.http.post(this.api+"register/patient",usersP);

    }

    //add medecins
    signUpMedecin(usersM : MedecinModel):Observable<any>{
      return this.http.post(this.api+"register/doctor",usersM);

    }

      //add admin
      signUpAdmin(usersA : AdminModel):Observable<any>{
        return this.http.post(this.api+"register/admin",usersA);
      }

  checkEmailExists(email: string) {
    return this.http.get<boolean>(`http://localhost:8800/register/checkEmailExists/${email}`);
  }

      //login
     login(request : Authentication):Observable<any>{


       return this.http.post(this.api+"authenticate",request,{headers:this.requestHeader});
     }

  public roleMatch(allowedRoles: any): boolean {
    let isMatch =false;
    const userRole: any = this.userAuthService.getRole();
    if (userRole != null && userRole) {
      for (let i = 0; i < userRole.length; i++) {
        if (allowedRoles.includes(userRole[i])) {
          isMatch = true;
          return isMatch;
        }
      }
    }
    return isMatch;
  }


     // get all disabled accounts doctors
     getDisableddoctor():Observable<MedecinModel[]>{
    return  this.http.get<MedecinModel[]>(this.api+"accounts/disabledDoctor");
     }

  // get all disabled accounts patients
  getDisabledPatient():Observable<PatientModel[]>{
    return  this.http.get<PatientModel[]>(this.api+"accounts/disabledPatient");
  }
     //get account doctor by id
     getDoctorByIdAndEnabledFalse(id: number):Observable<MedecinModel>{
    return  this.http.get<MedecinModel>(`${this.UrlDr}/${id}`,{headers:this.requestHeader});
  }

  // get all active accounts patients
  getAllActivePatient():Observable<PatientModel[]>{
    return  this.http.get<PatientModel[]>(this.api+"accounts/AllActivePatient");
  }
  // get all active accounts Doctors
  getAllActiveDoctor(searchKeyWord: string =""):Observable<MedecinModel[]>{
 let params = new HttpParams();
    params = params.append('searchKeyWord', searchKeyWord || ''); // add search keyword as a query parameter
 /**
 let params = new HttpParams();

      params = params.append('firstNameSearch', firstNameSearch || '');


      params = params.append('specialitySearch', specialitySearch || '');
  **/

    return  this.http.get<MedecinModel[]>(this.api+"accounts/AllActiveDoctor", { params });
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

  //desactivate accounts doctor
  desactivateAccountDoctor(id: number):Observable<MedecinModel>{
    return this.http.put<MedecinModel>(`${this.UrlDesactivateD}/${id}`, null);
  }

  getActivateDoctor(id:number):Observable<MedecinModel>{
    return this.http.get<MedecinModel>(`${this.UrlgetActiveD}/${id}`);
  }

  getActivatePatient(id:number):Observable<PatientModel>{
    return this.http.get<PatientModel>(`${this.UrlgetActiveP}/${id}`);
  }
  loginMed(id: number) {
    return this.getActivateDoctor(id).pipe(
      map((user) => {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', 'JWT');
        return true;
      }),
      catchError((error) => {
        this.errorMessage = <any>error;
        return of(false);
      })
    );
  }


  searchDoctors(fistname: string): Observable<MedecinModel[]> {
    return this.http.get<MedecinModel[]>(this.api+"accounts/search")

  }
  getCountPatientPerGender() {
    return this.http.get<Object[]>(this.api+"accounts/count-patients-per-gender");
  }

  changePassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    return this.http.put(`${this.api}accounts/users/${email}/password`, body);
  }



  createAppointment(request: AppointmentRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:8800/appointments/createAppointement',  request,{headers} ).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );;
  }

  getAllAppointments():Observable<AppointementResult[]>{
    return this.http.get<AppointementResult[]>(this.api+"appointments/")
  }

  getAllAppointementByDcotorId(id:number):Observable<AppointementResult[]>{
    return this.http.get<AppointementResult[]>(`${this.urlApntmntByDoctor}/${id}`);
  }

  getAppointementById(id:string):Observable<AppointementResult>{
    return this.http.get<AppointementResult>(`${this.urlApntmntById}/${id}`);
  }

  getAllAppointementWithoutDcotorId():Observable<AppointementResult[]>{
    return this.http.get<AppointementResult[]>(this.api+"appointments/appointmentsWithoutdoctor");
  }

  affecterMedecin(idAp: string, idD: UpdateAppointmentRequest):Observable<UpdateAppointmentRequest>{
    return this.http.put<UpdateAppointmentRequest>(`${this.urlAffecterMedecin}/${idAp}`,idD);
  }


  getRdvByPatient(id:string):Observable<AppointementResult[]>{
    return this.http.get<AppointementResult[]>(`${this.urlRdvPatient}/${id}`);
  }



  findMostFrequentSurgeryId(): Observable<string> {
    return this.http.get<string>(this.api+"appointments/mostFrequentSurgeryId");
  }

  getDoctorCount(): Observable<number> {
    return this.http.get<number>(this.api+'accounts/doctor-count');
  }
  getPatientCount(): Observable<number> {
    return this.http.get<number>(this.api+'accounts/patient-count');
  }

  getChirurgieCount(): Observable<number> {
    return this.http.get<number>(this.api+'chirurgies/chirurgie-count');
  }

  getAppointmentStatsByDoctor(doctorId: string): Observable<AppointmentStatsResult> {
    return this.http.get<AppointmentStatsResult>(this.api+`appointments/getAppointmentStatsByDoctor/${doctorId}`);
  }

  getDoctorsByChirurgie(chirurgieId : string):Observable<MedecinModel[]>{
    return this.http.get<MedecinModel[]>(this.api+`doctors/surgery/${chirurgieId}`);
  }

  accepterRdv(idAp: string):Observable<AppointementResult>{
    return this.http.put<AppointementResult>(this.api+`appointments/accepterAppointment/${idAp}`,null).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );;
  }
  rejectRdv(idAp: string):Observable<AppointementResult>{
    return this.http.put<AppointementResult>(this.api+`appointments/rejectAppointment/${idAp}`,null).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );;
  }

  getAllAcceptedAppointementByDcotorId(id: string):Observable<AppointementResult[]>{
    return this.http.get<AppointementResult[]>(this.api+`appointments/getAccptedAppointmentByDoctor/${id}`);
  }
  getAllAppointementByDcotorIdAndStatus(id: string):Observable<AppointementResult[]>{
    return this.http.get<AppointementResult[]>(this.api+`appointments/getAllAppointmentByDoctorAndStatus/${id}`);
  }
  getAllAppointementByChirurgieIdAndStatus(id: string):Observable<AppointementResult[]>{
    return this.http.get<AppointementResult[]>(this.api+`appointments/getAllAppointmentByChirurgieAndStatus/${id}`);
  }
  updatePhoto(idD: string, req:UpdatePhotoReq):Observable<any>{
    return this.http.put<any>(this.api+`doctors/updatePhotoDoctor/${idD}`,req).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );;
  }


  getRdvtPerMonth(id:string):Observable<any>{
    return this.http.get(this.api+`appointments/appointmentsPerMont/${id}`);
  }
  updateAppointment(idApp:string,req:updateAppointmentReq):Observable<updateAppointmentReq> {
    return this.http.put<updateAppointmentReq>(this.api + `appointments/updateAppointment/${idApp}`, req).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );

  }
  updateDoctor(idD: string, req:MedecinModel):Observable<MedecinModel>{
    return this.http.put<MedecinModel>(this.api+`doctors/updateDoctor/${idD}`,req).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );;
  }
  addOpinion( req:OpinionRequest):Observable<any>{
    return this.http.post<any>(this.api+"opinion/createOpinion",req).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );
  }
  getAllEnabledOpinion( ):Observable<OpinionResult[]>{
    return this.http.get<OpinionResult[]>(this.api+"opinion/");
  }
  getAllEnableOpinion( ):Observable<OpinionResult[]>{
    return this.http.get<OpinionResult[]>(this.api+"opinion/getAllOpinionTrue");
  }

  appointmentExists(date: string): Observable<boolean> {
    const selectedDate = new Date(date); // convert date to a Date object
    return this.getAllAppointments().pipe(
      map(appointments => appointments.some(appointment => appointment.dateRDV.getTime() === selectedDate.getTime()))
    );
  }

  accepterAvis(id: string):Observable<OpinionRequest>{
    return this.http.put<OpinionRequest>(this.api+`opinion/accepterAvis/${id}`, null).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );
  }
  supprimerOpinion(id:string):Observable<any>{
    return this.http.delete<any>(this.api +`opinion/delete/${id}`).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );

  }
createDevis(idAp:string,req:DevisReq):Observable<any>{
    return this.http.post(this.api+`appointments/${idAp}/devis`,req);
}
updateDevisByAdmin(idAp:string,req:DevisReq):Observable<any>{
  return this.http.put(this.api +`appointments/${idAp}/updateDevis`,req);

}
approveDevisByPatient(idAp:string):Observable<any>{
  return this.http.put(this.api +`appointments/${idAp}/confirmeDevis`,null);

}
rejectDevisByPatient(idAp:string):Observable<any>{
  return this.http.put(this.api+`appointments/${idAp}/rejectDevis`,null);
}
 getAllCreatedDevisByDoctor():Observable<AppointementResult[]>{
    return this.http.get<AppointementResult[]>(this.api+"appointments/created-devis");

}
getAllUpdatedDevisByAdmin():Observable<AppointementResult[]>{
    return this.http.get<AppointementResult[]>(this.api +"appointments/updated-devisByAdmin");
}
getAllApprovedDevisByPatient():Observable<AppointementResult[]>{
    return this.http.get<AppointementResult[]>(this.api+"appointments/approved-devisByPatient");

}
getAllConfirmededDevisByPatientId(idP:string):Observable<AppointementResult[]>{
    return this.http.get<AppointementResult[]>(this.api+`appointments/confirmed-devisByPatient/${idP}`);
}
getAllConfirmededDevisByDoctorId(idD:string):Observable<AppointementResult[]>{
    return this.http.get<AppointementResult[]>(this.api+`appointments/confirmed-devisByDoctorId/${idD}`);
}

getCreatedAppointmentById(idAp:string):Observable<AppointementResult>{
    return this.http.get<AppointementResult>(this.api+`appointments/getCreatedDevisById/${idAp}`)
}
getChangedAppointmentByAdmin(idAp:string):Observable<AppointementResult>{
    return this.http.get<AppointementResult>(this.api+`appointments/getChangeddDevisByAdmin/${idAp}`)
}


}


