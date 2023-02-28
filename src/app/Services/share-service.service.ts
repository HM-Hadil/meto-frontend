import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeChirurgie} from "../Models/typeChirurgie/type-chirurgie";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ShareServiceService {
  Url = 'http://localhost:8080/api/GetChirurgieById/';
//  Urldel= 'http://localhost:8080/api/deleteChirurgie/';
  constructor(private http: HttpClient) { }


  // Add chirurgie

  AddChirurgie(chirurgie: TypeChirurgie):Observable<any>{
  return this.http.post(environment.api+"addChirurgie",chirurgie);
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

  updateChirurgie(id : number , chirurgie : TypeChirurgie):Observable<any>{
    return this.http.put(environment.api+'UpdateChirurgie/'+id,chirurgie);
  }

  //delete Chirurgie
  deleteChirurgie(id:number):Observable<any>{
    return this.http.delete(environment.api+'DeleteChirurgie/'+id,{responseType:'text'});
  }
}
