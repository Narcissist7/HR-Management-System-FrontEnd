export class EntryLogFilterRequestDTO {
  endTime: string;
  role: string;
  visitee: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;

  constructor(
    role: string = '',
    visitee: string = '',
    startDate: Date | null = null,
    endDate: Date | null = null,
    startTime: string = '',
    endTime: string = '',
  ) {
    this.role = role;
    this.visitee = visitee;
    this.startDate = startDate;
    this.endDate = endDate;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
