export class AppointementResult {
  public constructor(

    public age: number,
    public createdOn: string,
    public dateRDV: Date,

    public doctor: {
    address: string,
    city: string,
    email: string,
    firstname: string,
    gender: string,
    id: string;
    lastname: string,
    role: string
  },
    public id: string,
    public image: string,
    public  note: string,

    public patient: {
    email: string,
    firstname: string,
    gender: string,
    id: string,
    lastname: string,
    role: string,
  },
    public phone: string,

    public status: string,
    public surgery: {
    description: string,
    duration: {
      days: number,
      hours: number,
      minutes: number,
      seconds: number
    },

       id: string,
       image: string,
       name: string,


  },
    public typeSang: string,
    public ville:string,
    public weight: number,
    public alcoolique:String ,
    public tension:String ,
    public diabete:String ,
    public fumee:String ,
    public mesureTension:String ,
    public mesureDiabete:String ,
    public analyseDiabete:String ,
    public autreMaladie:String ,
    public desAutreMaladie:String ,
    public analyseAutreMaladie:String ,
    public ancienOperation:String ,
    public nomAncienOperation:String ,
    public analyseAncienOperation:String ,
    public autreAnalyse:String,
  public devis: {
    id:string,
    cost: any,
    createdOn: Date,
    status: string,
  }

){}
}
