export class DoctorNotAvailableException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DoctorNotAvailableException';
  }
}
