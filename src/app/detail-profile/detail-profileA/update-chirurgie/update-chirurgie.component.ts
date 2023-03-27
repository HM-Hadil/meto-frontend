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
  public imagePath: any;
  imgURL: any = '';
  id!:number;
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
      this.chirurgieModel= olddata;
      this.ChirurgieForm.setValue({name:this.chirurgieModel.name,
        description:this.chirurgieModel.description,image:this.imgURL,duration:this.chirurgieModel.duration})

    });
  }




  updatedChirurgie( ) {
    let data = this.ChirurgieForm.value;
    console.log(data);
    console.log(this.imgURL);
    let typeChirurgie = new TypeChirurgie(
      data.id,
      data.name,
      data.description,
      this.imgURL,
      data.duration
    );
    console.log('data from the form to the model==>',typeChirurgie);
    this.share.updateChirurgie(this.id, typeChirurgie).subscribe((response) => {
      console.log("updated data ==>",response);

      alertify.success("chirurgie modifiée ")
      this.router.navigate(['modifierchirurgie']);

    });
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
