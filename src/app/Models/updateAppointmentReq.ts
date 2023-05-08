export class updateAppointmentReq{
  constructor(
    public id : string,
    public age: number,
    public dateRDV: Date,
    public doctorId: number,
    public note: string,
    public patientId: number,
    public phone: string,
    public surgeryId: string,
    public typeSang: string,
    public ville: string,
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
    public autreAnalyse:String
  ) {
  }
}
