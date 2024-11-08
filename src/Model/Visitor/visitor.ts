export class Visitor {
  constructor(
    public name: string,
    public phone: string,
    public dob: string,
    public gender: string,
    public pob: string, // Place of Birth
    public ssn: string, // Egyptian ID
    public address: string,
    public visitee: string
  ) {
    this.name = "";
    this.phone = "";
    this.dob = "";
    this.gender = "";
    this.pob = "";
    this.ssn = "";
    this.address = "";
    this.visitee = "";
  }
}
