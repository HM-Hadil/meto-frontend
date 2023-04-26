import { Component, OnInit } from '@angular/core';
import { TypeChirurgie} from "../../../Models/typeChirurgie/type-chirurgie";
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
  userFile: any;
  id!:string;
  public imagePath: any;
  imgURL: any = '';


  constructor(private share: ShareServiceService , private fb:FormBuilder ,
              private router : Router , private route: ActivatedRoute,) {
    let formControles = {
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
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
      (data )=> {
        this.ModelChirurgie = data;
        console.log('reload data ==>>', this.ModelChirurgie);


      },

      (err) => {
        console.error('Error ', err);
      }
    );
  }



  //delete chirurgie

  deleteChirurgie(item: any) {

      this.share.deleteChirurgie(item.id).subscribe();


        console.log("item =====>" ,item.id);
        let index = this.ModelChirurgie.indexOf(item.id);
        //delete from front end
        this.ModelChirurgie.splice(index, 1);
        alertify.success("chirurgie supprimée ");
    }




 //submit id from button "modifier"
  updateChirurgie(id:string) {
    this.router.navigate(['updatedchirurgie',id]);

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
