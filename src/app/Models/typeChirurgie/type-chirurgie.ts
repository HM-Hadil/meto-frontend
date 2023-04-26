
export class TypeChirurgie {
  public constructor(
    public id: string,
    public name?: String,
    public description?: String,
    public image?: String,
    public duration?: {
      days: number,
      hours: number,
      minutes: number,
      seconds: number
    }
  ) {}



}
