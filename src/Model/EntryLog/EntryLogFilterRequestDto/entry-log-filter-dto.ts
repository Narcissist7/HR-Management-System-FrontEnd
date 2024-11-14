export class EntryLogFilterRequestDTO {
  endTime: string;
  role: string;
  date: Date;
  time: string;
  visitee: string;
  startDate: Date;
  endDate: Date;
  startTime: string;

  constructor(
    role: string = '',
    date: Date = new Date(),
    time: string = '',
    visitee: string = '',
    startDate: Date = new Date(),
    endDate: Date = new Date(),
    startTime: string = '',
    endTime: string = ''
  ) {
    this.role = role;
    this.date = date;
    this.time = time;
    this.visitee = visitee;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
