import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators,} from '@angular/forms';
import { ShareServiceService } from '../../../Services/share-service.service';
import { TypeChirurgie } from '../../../Models/typeChirurgie/type-chirurgie';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as alertify from "alertifyjs"

@Component({
  selector: 'app-ajout-chirurgie',
  templateUrl: './ajout-chirurgie.component.html',
  styleUrls: ['./ajout-chirurgie.component.scss'],
})
export class AjoutChirurgieComponent implements OnInit {
  ChirurgieForm!: FormGroup;
  //imageUrl : string ='assets/image/medcin4.jfif';
  userFile: any;
  public imagePath: any;
  imgURL: any = '';

  constructor(
    private share: ShareServiceService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    let formControles = {
      nomChirurgie: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageChirurgie: new FormControl('', [Validators.required]),
      dureeChirurgie: new FormControl('', [Validators.required]),
    };
    this.ChirurgieForm = this.fb.group(formControles);
  }

  ngOnInit(): void {}

  addChirurgie() {
    if (this.ChirurgieForm.valid){
    let data = this.ChirurgieForm.value;
    console.log(data);
    console.log(this.imgURL);
    let typeChirurgie = new TypeChirurgie(
      data.id,
      data.nomChirurgie,
      data.description,
      this.imgURL,
      data.dureeChirurgie
    );
    console.log(typeChirurgie);

    this.share.AddChirurgie(typeChirurgie).subscribe();
    console.log('>>>> Add chirurgie', typeChirurgie);
    alertify.success("chirurgie ajoutée ")
    this.router.navigate(['/modifierchirurgie']);


  }
    else {
      alertify.error("insérer données valide ! ")

    }
  }

  //upload Image
  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
}
