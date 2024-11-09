class Experience {
  id: number;
  position: string;
  reason: string;
  company_name: string;
  start_date: Date;
  end_date: Date;

  constructor(id: number = 0, position: string = '', reason: string = '', company_name: string = '', start_date: Date = new Date(), end_date: Date = new Date()) {
    this.id = id;
    this.position = position;
    this.reason = reason;
    this.company_name = company_name;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}
