class Education {
  university: string
  degree: string
  grade: string
  major: string
  date: Date

  constructor(university: string = '', degree: string = '', grade: string = '', major: string = '', date: Date = new Date()) {
    this.university = university;
    this.degree = degree;
    this.grade = grade;
    this.major = major;
    this.date = date;
  }
}
