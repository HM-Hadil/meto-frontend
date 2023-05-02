import { Component, OnInit } from '@angular/core';
import {MedecinModel} from "../../../Models/MedecinModel";
import {ShareServiceService} from "../../../Services/share-service.service";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import alertify from "alertifyjs";
import {HttpClient} from "@angular/common/http";
import {UserAuthService} from "../../../Services/interceptor/user-auth.service";

@Component({
  selector: 'app-parametres-m',
  templateUrl: './parametres-m.component.html',
  styleUrls: ['./parametres-m.component.scss']
})
export class ParametresMComponent implements OnInit {
  changePhotoForm: FormGroup;
  medecin!: MedecinModel;
  MedecinForm!: FormGroup;
  userFile: any;
  public imagePath: any;
  imgURL: any = '';
  changePasswordForm!: FormGroup;
  passwordChanged = false;
  errorMessage = '';
  id!:string

  constructor(private share: ShareServiceService,
              private router: Router,
              private http: HttpClient,
              private fb: FormBuilder,
              private authService: UserAuthService) {
    this.MedecinForm = this.fb.group({

      adresse: ['', Validators.required],
      firstname: ['', Validators.required],
      image: ['', Validators.required],
      lastname: ['', Validators.required],
      specialite: ['', Validators.required],
      telephone: ['', Validators.required],
      ville: ['', Validators.required],
      parcours: this.fb.array([]),
      experience: this.fb.array([]),
    });

    this.changePasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),

    }, {
      validators: this.passwordMatchValidator()
    });

    this.changePhotoForm = this.fb.group({
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      gender: ['', Validators.required],
      image: ['', Validators.required],
      lastname: ['', Validators.required],

      experience: this.fb.array([]),

      parcours: this.fb.array([]),
      password: ['', Validators.required],
      specialite:  [''],
      surgeries: this.fb.array([]),
      telephone: ['', Validators.required],
      ville: ['', Validators.required]
    });


  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const newPassword = control.get('newPassword')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      console.log("newPass =", newPassword, "confirm pass=", confirmPassword)

      return newPassword === confirmPassword ? null : {passwordMismatch: true};
    };
  }


  ngOnInit(): void {


    const token = this.getToken();
    console.log("token:", token);
    if (token) {
      //Decode the token to get the payload (which contains user information
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      const id = payload.sub;
      this.share.getActivateDoctor(id).subscribe((oldData) => {
        this.medecin = oldData;
        this.MedecinForm.setValue({
          firstname: this.medecin.firstname,
          lastname: this.medecin.lastname,
          adresse: this.medecin.adresse,
          telephone: this.medecin.telephone,
          specialite: this.medecin.specialite,
          image: this.imgURL,
          ville: this.medecin.ville,
          parcours: [],
          experience: []
        })


        for (const item of this.medecin.parcours) {
          const parcoursFormGroup = this.fb.group({
            diploma: [item.diploma, Validators.required],
            establishment: [item.establishment, Validators.required],
            field: [item.field, Validators.required],
          });

          // Add the form group to the form array
          this.parcours.push(parcoursFormGroup);

        }


        for (const item of this.medecin.experience) {
          const experienceFormGroup = this.fb.group({
            establishment: [item.establishment, Validators.required],
            specialty: [item.specialty, Validators.required],
          });

          // Add the form group to the form array
          this.experience.push(experienceFormGroup);

        }
        console.log("info users by id :", this.medecin)
      });
    }
  }

  get parcours() {
    return this.MedecinForm.controls["parcours"] as FormArray;

  }

  get experience() {
    return this.MedecinForm.controls["experience"] as FormArray;

  }

  addNewParcours() {
    const parcoursFormGroup = this.fb.group({
      diploma: ['', Validators.required],
      establishment: ['', Validators.required],
      field: ['', Validators.required],
    });
    this.parcours.push(parcoursFormGroup);

  }

  addNewExperience() {
    const experienceFormGroup = this.fb.group({
      speciality: ['', Validators.required],
      establishment: ['', Validators.required],

    });
    this.experience.push(experienceFormGroup);

  }

  remove(Index: number) {
    this.parcours.removeAt(Index);
  }

  removeEx(Index: number) {
    this.experience.removeAt(Index);
  }

  getToken() {
    return localStorage.getItem("token");
  }


  onSubmit(): void {
    const token = this.getToken();
    console.log("token:", token);
    if (token) {
      //Decode the token to get the payload (which contains user information
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      const Email = payload.email;

      const oldPassword = this.changePasswordForm.value.oldPassword;
      console.log("old password =>", oldPassword);
      const newPassword = this.changePasswordForm.value.newPassword;
      console.log("new password =>", newPassword);

      this.share.changePassword(Email, oldPassword, newPassword).subscribe(
        () => {
          this.passwordChanged = true;

          this.authService.clear();
        },
        error => {
          this.passwordChanged = false;
          this.errorMessage = error.error;
          alertify.success("Votre Mot de Passe a été changé avec succés !");
          this.router.navigate(['authentifier']);
        }
      );
    }
  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }


  //upload Image

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.imgURL = reader.result;
        this.imagePath = e.target.result;
      };
    }
  }

  changePhoto() {
    let data = this.changePhotoForm.value;
    const token = this.getToken();
    let medecins = new MedecinModel(
      data.id,
      data.firstname,
      data.lastname,
      data.email,
      data.password,
      data.ville,
      data.adresse,
      data.specialite,
      data.gender,
      this.imagePath,
      data.telephone,
      data.experience,
      data.parcours,
      data.surgeries
    );

    if (token) {
      //Decode the token to get the payload (which contains user information
      const payload = JSON.parse(window.atob(token.split('.')[1]));
    const id = payload.sub;
        this.share.updatePhoto(this.id,medecins).subscribe();
    }
  }

  updateDoctor() {
    let data = this.MedecinForm.value;
    console.log("data from form-->",data);
    let medecins = new MedecinModel(
      data.id,
      data.firstname,
      data.lastname,
      data.email,
      data.password,
      data.ville,
      data.adresse,
      data.specialite,
      data.gender,
      this.imgURL,
      data.telephone,
      data.experience,
      data.parcours,
      data.surgeries


    );
    const token = this.getToken();
    if (token) {
      //Decode the token to get the payload (which contains user information
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      const id = payload.sub;
      this.share.updatePhoto(id,medecins).subscribe();

    this.share.updateDoctor(id,medecins).subscribe(data=>{
      console.log("back form",data)
      alertify.success("La mise à jours de votre profile a été effectuée avec succès ")
      window.location.reload();
    })}
  }
  getSpecialiteWithoutBrackets(specialite: string): string {
    return specialite.replace(/\[|\]/g, '');}


}
