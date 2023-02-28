import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './composants/header/header.component';
import { FooterComponent } from './composants/footer/footer.component';
import { AcceuilContentComponent } from './acceuil-content/acceuil-content.component';
import { ChirurgiesComponent } from './servicePatient/chirurgies/chirurgies.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { InscrireComponent } from './EspaceMedecin/inscrire/inscrire.component';
import { AuthentifierComponent } from './EspaceMedecin/authentifier/authentifier.component';
import { ProfileMedecinComponent } from './EspaceMedecin/profile-medecin/profile-medecin.component';
import { LoginPatientComponent } from './EspacePatient/login-patient/login-patient.component';
import { SignUpPatientComponent } from './EspacePatient/sign-up-patient/sign-up-patient.component';
import { ProfilePatientComponent } from './EspacePatient/profile-patient/profile-patient.component';
import { SignUpComponent } from './Admin/sign-up/sign-up.component';
import { LoginComponent } from './Admin/login/login.component';
import { ProfilAdminComponent } from './Admin/profil-admin/profil-admin.component';
import { SejoursComponent } from './servicePatient/sejours/sejours.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from "@angular/material/divider";
import { ShowProfileMComponent } from './detail-profile/detail-profileM/show-profile-m/show-profile-m.component';
import { MessagesMComponent } from './detail-profile/detail-profileM/messages-m/messages-m.component';
import { ParametresMComponent } from './detail-profile/detail-profileM/parametres-m/parametres-m.component';
import { DetailMessageComponent } from './detail-profile/detail-profileM/detail-message/detail-message.component';
import { DashboardComponent } from './detail-profile/detail-profileM/dashboard/dashboard.component';
import { MessagesMedComponent } from './detail-profile/detail-profileA/messages-med/messages-med.component';
import { ShowProfilePComponent } from './detail-profile/detail-profileP/show-profile-p/show-profile-p.component';
import { ChirurgieSelecionneeComponent } from './servicePatient/chirurgie-selecionnee/chirurgie-selecionnee.component';
import { DetailParcoursMedcComponent } from './servicePatient/detail-parcours-medc/detail-parcours-medc.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ResetPasswordComponent } from './composants/reset-password/reset-password.component';
import { FormuleRndvComponent } from './detail-profile/detail-profileP/formule-rndv/formule-rndv.component';
import { MessagesfromAdminComponent } from './detail-profile/detail-profileP/messagesfrom-admin/messagesfrom-admin.component';
import { ComptesPatientsComponent } from './detail-profile/detail-profileA/Comptes/comptes-patients/comptes-patients.component';
import { ComptesMedecinsComponent } from './detail-profile/detail-profileA/Comptes/comptes-medecins/comptes-medecins.component';
import { DashboardAdminComponent } from './detail-profile/detail-profileA/dashboard-admin/dashboard-admin.component';
import { ComptesMedecinDetailComponent } from './detail-profile/detail-profileA/Comptes/comptes-medecin-detail/comptes-medecin-detail.component';
import { ComptesPatientsDetailComponent } from './detail-profile/detail-profileA/Comptes/comptes-patients-detail/comptes-patients-detail.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { AjoutChirurgieComponent } from './detail-profile/detail-profileA/ajout-chirurgie/ajout-chirurgie.component';
import { ModifierChirurgieComponent } from './detail-profile/detail-profileA/modifier-chirurgie/modifier-chirurgie.component';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AcceuilContentComponent,
    ChirurgiesComponent,
    NotFound404Component,
    InscrireComponent,
    AuthentifierComponent,
    ProfileMedecinComponent,
    LoginPatientComponent,
    SignUpPatientComponent,
    ProfilePatientComponent,
    SignUpComponent,
    LoginComponent,
    ProfilAdminComponent,
    SejoursComponent,
    ShowProfileMComponent,
    MessagesMComponent,
    ParametresMComponent,
    DetailMessageComponent,
    DashboardComponent,
    MessagesMedComponent,
    ShowProfilePComponent,
    ChirurgieSelecionneeComponent,
    DetailParcoursMedcComponent,
    ResetPasswordComponent,
    FormuleRndvComponent,
    MessagesfromAdminComponent,
    ComptesPatientsComponent,
    ComptesMedecinsComponent,
    DashboardAdminComponent,
    ComptesMedecinDetailComponent,
    ComptesPatientsDetailComponent,
    AjoutChirurgieComponent,
    ModifierChirurgieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
