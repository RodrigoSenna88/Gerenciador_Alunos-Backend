class Register {
  name: string;

  phone: number;

  responsable: string;

  startDate: Date;

  schedule: string;

  constructor({name, phone, responsable, startDate, schedule}: Register) {
    this.name = name;
    this.phone = phone;
    this.responsable = responsable;
    this.startDate = startDate;
    this.schedule = schedule;
  }
}

export default Register;
