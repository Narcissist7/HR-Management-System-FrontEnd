export class Jobl {
    date: Date;
    title: string;
    jobId: number;
    recruiter: string;
    jobStatus: string;
    description: string;
    requirements: string;
    jobRecordsId: number;

    constructor(){
        this.date = new Date();
        this.title= " ";
        this.jobId= 0;
        this.recruiter= " ";
        this.jobStatus= " ";
        this.description= " ";
        this.requirements= " ";
        this.jobRecordsId= 0;
    }
}
