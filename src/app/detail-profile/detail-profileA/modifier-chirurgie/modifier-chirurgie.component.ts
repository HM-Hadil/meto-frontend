import { Component, OnInit } from '@angular/core';
import {TypeChirurgie} from "../../../Models/typeChirurgie/type-chirurgie";
import {Observable} from "rxjs";
import {ShareServiceService} from "../../../Services/share-service.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import alertify from "alertifyjs";

@Component({
  selector: 'app-modifier-chirurgie',
  templateUrl: './modifier-chirurgie.component.html',
  styleUrls: ['./modifier-chirurgie.component.scss']
})
export class ModifierChirurgieComponent implements OnInit {
  ChirurgieForm!: FormGroup;
  ModelChirurgie: TypeChirurgie[]= [];
  chirurgieModel!  : TypeChirurgie;
  userFile: any;
  id!:number;
  public imagePath: any;
  imgURL: any = '';

  constructor(private share: ShareServiceService , private fb:FormBuilder ,
              private router : Router , private route: ActivatedRoute,) {
    let formControles = {
      nomChirurgie: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageChirurgie: new FormControl('', [Validators.required]),
      dureeChirurgie: new FormControl('', [Validators.required]),
    };
    this.ChirurgieForm = this.fb.group(formControles);
  }

  ngOnInit() {
    this.reloadData();
    this.share.RequiredRefresh.subscribe(r=>{
      this.reloadData();
    })

    }

  //get All Chirurgie
  reloadData() {
    this.share.getAllChirurgie().subscribe(
      (response) => {
        this.ModelChirurgie = response;
        console.log('reload data ==>>', this.ModelChirurgie);

      },

      (err) => {
        console.error('Error ', err);
      }
    );
  }



  //delete chirurgie

  deleteChirurgie(item: any) {
    alertify.confirm("Supprimer Chirurgie","voulez-vous supprimer ?",()=>{},
      () =>{
        this.share.deleteChirurgie(item.id).subscribe((data) => {
          console.log("data to delete ==>",data);
          console.log("id ===>",data.id); });

        console.log("item =====>" ,item);
        let index = this.ModelChirurgie.indexOf(item);
        //delete from front end
        this.ModelChirurgie.splice(index, 1);
        alertify.success("chirurgie supprimée ")
    })

  }


 //submit id from button "modifier"
  updateChirurgie(id:number) {
    this.router.navigate(['updatedchirurgie',id])

  /**  console.log('the id submitted is ', id);
    this.share.getChirurgirById(id).subscribe((olddata) => {
      console.log('>>>>old data :', olddata);
      this.chirurgieModel= olddata;
      this.ChirurgieForm.setValue({nomChirurgie:this.chirurgieModel.nomChirurgie,
        description:this.chirurgieModel.description,imageChirurgie:this.imgURL, dureeChirurgie:this.chirurgieModel.dureeChirurgie})
**/
      // Initialize the form with data from the backend // get All data

    /**  this.ChirurgieForm.controls['nomChirurgie'].patchValue(this.chirurgieModel.nomChirurgie);
      this.ChirurgieForm.controls['description'].patchValue(this.chirurgieModel.description);
      this.ChirurgieForm.controls['imageChirurgie'].patchValue(this.imgURL);
      this.ChirurgieForm.controls['dureeChirurgie'].setValue(this.chirurgieModel.dureeChirurgie);
      console.log('initForm ===>', this.ChirurgieForm);**/


    }




  //update chirurgie from button "enregister"
   /** updatedChirurgie( ) {

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
      console.log('data from the form to the model==>',typeChirurgie);
      this.share.updateChirurgie(data.id, data).subscribe((response) => {
        console.log("updated data ==>",response);

        const closebtn = document.getElementById(
          'closebtn'
        ) as HTMLButtonElement | null;

        if (closebtn != null) {
          console.log(' button closed');
          closebtn.click();
        }
        alertify.success("chirurgie modifiée ")
        this.router.navigate(['modifierchirurgie']);
      });
    }

       //// window.location.reload();

**/



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
