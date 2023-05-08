import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShareServiceService} from "../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TypeChirurgie} from "../../../Models/typeChirurgie/type-chirurgie";
import alertify from "alertifyjs";
@Component({
  selector: 'app-update-chirurgie',
  templateUrl: './update-chirurgie.component.html',
  styleUrls: ['./update-chirurgie.component.scss']
})
export class UpdateChirurgieComponent implements OnInit {
  ChirurgieForm!: FormGroup;
  chirurgieModel!  : TypeChirurgie;
  userFile: any;
   imagePath: any ='';
  imgURL: any = '';
  id!:string;
  constructor(private share: ShareServiceService , private fb:FormBuilder ,
              private router : Router , private route: ActivatedRoute,) {
                this.ChirurgieForm = this.fb.group({
                  name:['',Validators.required],
                  description:['',Validators.required] ,
                  image:['',Validators.required],
                  duration: this.fb.group({
                    days: [''],
                    hours: [''],
                    minutes: [''],
                    seconds: ['']
                  }),

                });
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

    this.share.getChirurgirById(this.id).subscribe((olddata) => {
      console.log('>>>>old data :', olddata);
      this.chirurgieModel = olddata;
      this.imgURL=olddata.image;
      this.ChirurgieForm.setValue({
        name: this.chirurgieModel.name,
        description: this.chirurgieModel.description,
        duration: this.chirurgieModel.duration  ,
        image: this.chirurgieModel.image,

      });
    });
  }




  updatedChirurgie( ) {
    let data = this.ChirurgieForm.value;
    console.log("data form =>" ,data);
    console.log(this.imgURL);
    let typeChirurgie = new TypeChirurgie(
      data.id,
      data.name,
      data.description,
      this.imagePath,
      data.duration
    );
    console.log('data from the form to the model==>',typeChirurgie);
    this.share.updateChirurgie(this.id, typeChirurgie).subscribe((response) => {
      console.log("updated data ==>",response);
      console.log(this.imagePath);

      alertify.success("chirurgie modifiée ")
      this.router.navigate(['modifierchirurgie']);

    });
  }

  //upload Image
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {

        this.imagePath = e.target.result;
      };
    }
  }
}
