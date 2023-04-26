export class MedecinModel{
  public constructor(
    public  id:any,

    public  firstname:string,

    public  lastname:string,

    public  email:string,

    public  password:string,

    public ville :string ,

    public adresse : string ,

    public specialite: string,

    public gender:string,

    public image:string ,

    public telephone:string ,
   public experience: {
      establishment: string;
      specialty: string;
  }[],


  public parcours: {
      diploma: string;
      establishment: string;
      field: string;
  }[],
    public surgeries: string[] =[],



){

  }
}
