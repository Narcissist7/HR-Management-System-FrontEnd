export class Job {
    date: Date;
    title: string;
    id: number;
    recruiter: string;
    jobStatus: string;
    description: string;
    requirements: string;
    jobRecordsId: number;

    constructor(){
        this.date = new Date();
        this.title= " ";
        this.id= 0;
        this.recruiter= " ";
        this.jobStatus= " ";
        this.description= " ";
        this.requirements= " ";
        this.jobRecordsId= 0;
    }
}
