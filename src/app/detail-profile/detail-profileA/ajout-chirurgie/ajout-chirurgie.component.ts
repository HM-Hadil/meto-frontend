import { Component, OnInit } from '@angular/core';
import { NgForm} from "@angular/forms";
import {ShareServiceService} from "../../../Services/share-service.service";
import {TypeChirurgie} from "../../../Models/typeChirurgie/type-chirurgie";
import {Router,ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ajout-chirurgie',
  templateUrl: './ajout-chirurgie.component.html',
  styleUrls: ['./ajout-chirurgie.component.scss']
})
export class AjoutChirurgieComponent implements OnInit {
  chirurgieModel: TypeChirurgie;
  //imageUrl : string ='assets/image/medcin4.jfif';
  userFile: any;
  public imagePath: any;
  imgURL: any = '';


  constructor( private share: ShareServiceService,
              private router :Router , private http: HttpClient)
  {
    /**
     *
    this.ChirurgieForm = this.formbuilder.group(
      {
        nomChirurgie:['', Validators.required],
        description:['', Validators.required],
      //  imageChirurgie:['', [Validators.required]],
        duréeChirurgie:['',Validators.required]

      })**/

      this.chirurgieModel = new TypeChirurgie();

  }


  ngOnInit(): void {
  }

  addChirurgie(f :NgForm)
  {
  /** this.chirurgieModel.nomChirurgie= this.ChirurgieForm.get('nomChirurgie')?.value
     this.chirurgieModel.description=this.ChirurgieForm.get('description')?.value;
     this.chirurgieModel.imageChirurgie=this.ChirurgieForm.get('imageChirurgie')?.value;
     this.chirurgieModel.dureeChirurgie=this.ChirurgieForm.get('duréeChirurgie')?.value;
    //const chirurgie: TypeChirurgie = Object.assign({}, this.ChirurgieForm.value);
 // console.log('>>> nh Form',f.value);**/

this.share.AddChirurgie(this.chirurgieModel).subscribe()
    console.log('>>>> Add chirurgie', this.chirurgieModel);
    this.router.navigate(['modifierchirurgie']);

  }

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
