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
import {LoginComponent} from "./Admin/login/login.component";
import {LoginPatientComponent} from "./EspacePatient/login-patient/login-patient.component";
import {SignUpPatientComponent} from "./EspacePatient/sign-up-patient/sign-up-patient.component";
import {ProfileMedecinComponent} from "./EspaceMedecin/profile-medecin/profile-medecin.component";
import {ChirurgieSelecionneeComponent} from "./servicePatient/chirurgie-selecionnee/chirurgie-selecionnee.component";
import {DetailParcoursMedcComponent} from "./servicePatient/detail-parcours-medc/detail-parcours-medc.component";
import {ShowProfileMComponent} from "./detail-profile/detail-profileM/show-profile-m/show-profile-m.component";
import {DashboardComponent} from "./detail-profile/detail-profileM/dashboard/dashboard.component";
import {ParametresMComponent} from "./detail-profile/detail-profileM/parametres-m/parametres-m.component";
import {MessagesMComponent} from "./detail-profile/detail-profileM/messages-m/messages-m.component";
import {DetailMessageComponent} from "./detail-profile/detail-profileM/detail-message/detail-message.component";
import {ProfilePatientComponent} from "./EspacePatient/profile-patient/profile-patient.component";
import {ProfilAdminComponent} from "./Admin/profil-admin/profil-admin.component";
import {ResetPasswordComponent} from "./composants/reset-password/reset-password.component";
import {FormuleRndvComponent} from "./detail-profile/detail-profileP/formule-rndv/formule-rndv.component";
import {
  MessagesfromAdminComponent
} from "./detail-profile/detail-profileP/messagesfrom-admin/messagesfrom-admin.component";
import {
  ComptesMedecinsComponent
} from "./detail-profile/detail-profileA/Comptes/comptes-medecins/comptes-medecins.component";
import {
  ComptesPatientsComponent
} from "./detail-profile/detail-profileA/Comptes/comptes-patients/comptes-patients.component";
import {DashboardAdminComponent} from "./detail-profile/detail-profileA/dashboard-admin/dashboard-admin.component";
import {
  ComptesMedecinDetailComponent
} from "./detail-profile/detail-profileA/Comptes/comptes-medecin-detail/comptes-medecin-detail.component";
import {MessagesMedComponent} from "./detail-profile/detail-profileA/messages-med/messages-med.component";
import {AjoutChirurgieComponent} from "./detail-profile/detail-profileA/ajout-chirurgie/ajout-chirurgie.component";
import {
  ModifierChirurgieComponent
} from "./detail-profile/detail-profileA/modifier-chirurgie/modifier-chirurgie.component";
import {UpdateChirurgieComponent} from "./detail-profile/detail-profileA/update-chirurgie/update-chirurgie.component";
import { SignUpComponent } from './Admin/sign-up/sign-up.component';

const routes: Routes = [
  {path : '', component: AcceuilContentComponent},
  {path : 'chirurgie', component: ChirurgiesComponent},
  {path : 'sejours', component: SejoursComponent},
  {path : 'inscrire', component: InscrireComponent},
  {path : 'authentifier' , component : AuthentifierComponent},
  {path : 'login' , component: LoginComponent},
  {path : 'signUpA' , component : SignUpComponent},
  {path : 'loginPatient', component:LoginPatientComponent},

  {path : 'signPatient' , component : SignUpPatientComponent},
  {path : '' , component : ProfileMedecinComponent ,
    children:[
      {path : 'showProfileMedecin' , component : ShowProfileMComponent},
      {path : 'messagesM' , component : MessagesMComponent},
      {path : 'dashboardMed' , component : DashboardComponent},
      {path : 'parametreMed' , component : ParametresMComponent},
      {path : 'detailMsg' , component : DetailMessageComponent},
    ]
  },
  {path : 'profileP' , component : ProfilePatientComponent},

  //admin
  {path : '' , component : ProfilAdminComponent

  , children:[
      {path : 'dashboardAdmin' , component: DashboardAdminComponent},
    {path : 'comptesMedecins' , component: ComptesMedecinsComponent},
      {path : 'comptesPatients' , component: ComptesPatientsComponent},
      {path : 'detail-compte-Medecin' , component: ComptesMedecinDetailComponent},
      {path :'rendez-vous' , component:MessagesMedComponent },
      {path : 'ajoutchirurgie' , component: AjoutChirurgieComponent },
      {path : 'modifierchirurgie' , component:ModifierChirurgieComponent },
      {path : 'updatedchirurgie/:id' , component: UpdateChirurgieComponent}
    ]
  },

  {path : 'resetPassword' , component : ResetPasswordComponent},

  {path: '', component:ProfilePatientComponent ,
    children:[
      {path : 'formuleRndv', component : FormuleRndvComponent},
      { path: 'messagesfromAdmin' , component: MessagesfromAdminComponent},
      {path : 'dashboardAdmin' , component: DashboardAdminComponent}
    ]

  },


  {path : 'chirurgieSelecionnee',  component : ChirurgieSelecionneeComponent},
  {path : 'detailParcoursMedecin' , component : DetailParcoursMedcComponent},

  {path : '**' , component: NotFound404Component},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
