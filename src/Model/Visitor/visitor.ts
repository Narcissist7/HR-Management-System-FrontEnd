export class Visitor {
  name: string;
  phone: string;
  dob: Date;
  gender: string;
  pob: string;// Place of Birth
  ssn: string; // Egyptian ID
  address: string;
  visitee: string;

  constructor(name = "", phone = "", dob = new Date(), gender = "", pob = "", ssn = "", address = "", visitee = "",) {
    this.name = name;
    this.phone = phone;
    this.dob = dob;
    this.gender = gender;
    this.pob = pob;
    this.ssn = ssn;
    this.address = address;
    this.visitee = visitee;
  }
}
