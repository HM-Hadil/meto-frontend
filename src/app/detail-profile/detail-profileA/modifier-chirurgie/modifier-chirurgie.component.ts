import { Component, OnInit } from '@angular/core';
import {TypeChirurgie} from "../../../Models/typeChirurgie/type-chirurgie";
import {Observable} from "rxjs";
import {ShareServiceService} from "../../../Services/share-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-modifier-chirurgie',
  templateUrl: './modifier-chirurgie.component.html',
  styleUrls: ['./modifier-chirurgie.component.scss']
})
export class ModifierChirurgieComponent implements OnInit {
  chirurgieForm! : FormGroup;
  ModelChirurgie: TypeChirurgie[]= [];
  id!: number;
  chirurgieModel!  : TypeChirurgie;

  constructor(private share: ShareServiceService , private formbuilder:FormBuilder ,
              private router : Router , private route: ActivatedRoute,) {
    this.chirurgieForm = formbuilder.group({
      nomChirurgie:['', Validators.required],
      description:['', Validators.required],
      imageChirurgie:['',Validators.required],
      dureeChirurgie:['',Validators.required]

    })
  }

  ngOnInit() {
    this.reloadData();

    }

  //get All Chirurgie
    reloadData(){
    this.share.getAllChirurgie().subscribe(response =>{
      try {
        if (response) {
          this.ModelChirurgie = response;
          console.log('reload data ==>>', this.ModelChirurgie);
        }
      } catch (e) {
        console.warn('Exception ', e);
      }
    }, err => {
      console.error('Error ', err);
    })

  }

  //delete chirurgie

  deleteChirurgie(id : number){
    this.share.deleteChirurgie(id).subscribe(data => {
      console.log(data)
      console.log(data.id)
      this.reloadData();
    })

  }


 //submit id from button "modifier"
  updateChirurgie(id: number) {
    console.log('the id submitted is ', id);
    this.share.getChirurgirById(id).subscribe((olddata) => {
      console.log('>>>>old data :', olddata);
      console.log('dureechirurgie ===>',olddata.dureeChirurgie);
      this.chirurgieModel= olddata;

      // Initialize the form with data from the backend // get All data

      this.chirurgieForm.controls['nomChirurgie'].patchValue(this.chirurgieModel.nomChirurgie);
      this.chirurgieForm.controls['description'].patchValue(this.chirurgieModel.description);
      this.chirurgieForm.controls['imageChirurgie'].patchValue(this.chirurgieModel.imageChirurgie);
      this.chirurgieForm.controls['dureeChirurgie'].setValue('olddata.dureeChirurgie');
      console.log('initForm ===>', this.chirurgieForm);


    })



  }
  //update chirurgie from button "enregister"
  updatedChirurgie(id:number) {
    const payload: TypeChirurgie ={
      id: this.id,
      nomChirurgie: this.chirurgieForm.controls['nomChirurgie'].value,
      description: this.chirurgieForm.controls['description'].value,
      imageChirurgie: this.chirurgieForm.controls['imageChirurgie'].value,
      dureeChirurgie: this.chirurgieForm.controls['dureeChirurgie'].value
    }
    this.share.updateChirurgie(id,payload).subscribe(
      (response) => {
        console.log(response);
        try {
          if (response) {
            //Use a success modal here
          }
        } catch (e) {
          console.warn('Exception ', e);
        }


        const closebtn = document.getElementById(
          'closebtn',
        ) as HTMLButtonElement | null;

        if (closebtn != null) {
          console.log(" button closed");
          closebtn.click();
        }
        this.router.navigate(['modifierchirurgie']);
      }

    );


  }

}
