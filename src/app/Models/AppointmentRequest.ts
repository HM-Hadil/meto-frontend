import {PatientModel} from "./PatientModel";
export class AppointmentRequest {
  public constructor(
    public age: number,
    public dateRDV: Date,
    public doctorId: number,
    public image: string,
    public note: string,
    public patientId: number,
    public phone: string,
    public surgeryId: string,
    public typeSang: string,
    public ville: string,
    public weight: number
  ){
}
}
