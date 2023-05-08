export class OpinionRequest {
  public constructor(
    public id : string,
    public image: string,
    public message: string,
    public patientId : string
  ){
  }
}
