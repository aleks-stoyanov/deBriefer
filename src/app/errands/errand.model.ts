export class Errand {
    public apiID: any;
    public urgency: number;
    public name: string;
    public description: string;
    public taskArray=[{}];

    constructor(apiID: any, urgency: number, name: string, description: string, taskArray ) {
        this.apiID = apiID;
        this.urgency = urgency;
        this.name = name;
        this.description = description;
        this.taskArray = taskArray;
    }
}
