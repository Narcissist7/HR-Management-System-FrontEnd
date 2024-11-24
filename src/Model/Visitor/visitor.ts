export class Visitor {
  name: string;
  phone: string;
  dob: Date;
  gender: string;
  pob: string;// Place of Birth
  ssn: string; // Egyptian ID
  address: string;
  visitee: string;
  pic: string;

  constructor(name = "", phone = "", dob = new Date(), gender = "", pob = "", ssn = "", address = "", visitee = "", pic: string = "") {
    this.name = name;
    this.phone = phone;
    this.dob = dob;
    this.gender = gender;
    this.pob = pob;
    this.ssn = ssn;
    this.address = address;
    this.visitee = visitee;
    this.pic = pic;
  }
}
