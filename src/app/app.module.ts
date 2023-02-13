// @ts-ignore
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
import { TypeChirurgieSelectionnerComponent } from './servicePatient/type-chirurgie-selectionner/type-chirurgie-selectionner.component';

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
    TypeChirurgieSelectionnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
