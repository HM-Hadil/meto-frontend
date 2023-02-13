import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChirurgiesComponent} from "./servicePatient/chirurgies/chirurgies.component";
import {AppComponent} from "./app.component";
import {AcceuilContentComponent} from "./acceuil-content/acceuil-content.component";
import {NotFoundError} from "rxjs";
import {NotFound404Component} from "./not-found404/not-found404.component";
import {SejoursComponent} from "./servicePatient/sejours/sejours.component";
import {InscrireComponent} from "./EspaceMedecin/inscrire/inscrire.component";
import {AuthentifierComponent} from "./EspaceMedecin/authentifier/authentifier.component";

const routes: Routes = [
  {path : '', component: AcceuilContentComponent},
  {path : 'chirurgie', component: ChirurgiesComponent},
  {path : 'sejours', component: SejoursComponent},
  {path : 'inscrire', component: InscrireComponent},
  {path : 'authentifier' , component : AuthentifierComponent},


  {path : '**' , component: NotFound404Component},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
