class Education {
  id: number
  university: string
  degree: string
  grade: string
  major: string
  date: Date

  constructor(id: number = 0, university: string = '', degree: string = '', grade: string = '', major: string = '', date: Date = new Date()) {
    this.id = 0;
    this.university = university;
    this.degree = degree;
    this.grade = grade;
    this.major = major;
    this.date = date;
  }
}
