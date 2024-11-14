export class EntryLog {
  name: string;
  person_id: number;
  role: string;
  ssn: string;
  date: Date | null;
  time: string;
  phoneNumber: string;
  visitee: string;

  constructor(name: string = '', person_id: number = 0, role: string = '', ssn: string = '', date: Date = new Date(), time: string = '', phoneNumber: string = '', visitee: string = '') {
    this.name = name;
    this.person_id = person_id;
    this.role = role;
    this.ssn = ssn;
    this.date = date;
    this.time = time;
    this.phoneNumber = phoneNumber;
    this.visitee = visitee;
  }
}
