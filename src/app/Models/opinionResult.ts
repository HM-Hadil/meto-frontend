export class OpinionResult{

  public constructor(
 public  id:string,
    public createdOn: string,
    public image: string,
    public message: string,
    public patient: {
      email: string,
      firstname: string,
      gender: string,
      id: string,
      lastname: string,
      role: string,
    }

  ){

  }
}
