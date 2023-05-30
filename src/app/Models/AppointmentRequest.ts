import {PatientModel} from "./PatientModel";
export class AppointmentRequest {
  public constructor(
      public id: string,
      public note: string,
      public image: string,
      public age: number,
      public patientId: number,
      public ville: string,
      public weight: number,
      public dateRDV: Date | undefined,
      public typeSang: string,
      public phone: string,
      public surgeryId: string,
      public doctorId: string,
      public alcoolique: String,
      public tension: String,
      public diabete: String,
      public fumee: String,
      public mesureTension: String,
      public mesureDiabete: String,
      public analyseDiabete: String,
      public autreMaladie: String,
      public desAutreMaladie: String,
      public analyseAutreMaladie: String,
      public ancienOperation: String,
      public nomAncienOperation: String,
      public analyseAncienOperation: String,
      public autreAnalyse: String
  ){
}
}
