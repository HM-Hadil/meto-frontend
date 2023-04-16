export class AppointementResult {
  public constructor(

    public age: number,
    public createdOn: string,
    public dateRDV: string,

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
    public weight: number

){}
}
