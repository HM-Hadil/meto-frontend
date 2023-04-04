import { Injectable } from '@angular/core';
import {stringifyTask} from "@angular/compiler-cli/ngcc/src/execution/tasks/utils";
import {ShareServiceService} from "../share-service.service";
import {map, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {MedecinModel} from "../../Models/MedecinModel";

@Injectable({
  providedIn: 'root'
})

//to communicate with local storage
//save role and token in local storage
export class UserAuthService {


  constructor() { }

  public setRole(role : string){
    localStorage.setItem("role", JSON.stringify(role));
  }

  public getRole() {

    return localStorage.getItem("role");
  }

  public setToken(token:string){
    localStorage.setItem("token" , token);

  }
  public getToken(){
  return  localStorage.getItem('token');
  }

  public clear(){
   localStorage.clear();
  }

  public isLoggedIn(){

   return this.getRole() && this.getToken();
  }







}
