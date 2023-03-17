import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";
import {TypeChirurgie} from "../Models/typeChirurgie/type-chirurgie";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ShareServiceService {
  Url = 'http://localhost:8800/api/GetChirurgieById';
 urlPut='http://localhost:8800/api/UpdateChirurgie';

  private _refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private http: HttpClient) { }


  // Add chirurgie

  AddChirurgie(chirurgie: TypeChirurgie):Observable<any>{
  return this.http.post(environment.api+"addChirurgie",chirurgie).pipe(
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
    return this.http.get<TypeChirurgie[]>(environment.api+"getAllChirurgies");
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
    return this.http.delete(environment.api+'DeleteChirurgie/'+id).pipe(
      tap(()=>{
        this._refreshrequired.next()
      })
    );
  }
}
