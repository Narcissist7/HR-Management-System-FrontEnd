
// @ts-ignore
import { Education } from '../Education/eductaion';
// @ts-ignore
import { Experience } from '../Experience/experience';
export class Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  job_title:String;
  gender: string;
  pob: string;
  military_status: string;
  ssn: string;
  address: string;
  martial_status: string;
  role: string;
  educations: Education[];
  experiences: Experience[];

  constructor(id: number = 0, name: string = '', email: string = '', phone: string = '', dob: string = '',job_title: string = '', gender: string = '', pob: string = '', military_status: string = '', ssn: string = '', address: string = '', martial_status: string = '', role: string = "", educations: Education[] = new Array<Education>(), experiences: Experience[] = new Array<Experience>()) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.dob = dob;
    this.job_title = job_title;
    this.gender = gender;
    this.pob = pob;
    this.military_status = military_status;
    this.ssn = ssn;
    this.address = address;
    this.martial_status = martial_status;
    this.role = role;
    this.educations = educations;
    this.experiences = experiences;
  }
}
