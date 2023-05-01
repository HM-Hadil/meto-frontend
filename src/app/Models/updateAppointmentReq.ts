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
    public weight: number
  ) {
  }
}
