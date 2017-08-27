export class Errand {
    public urgency: number;
    public name: string;
    public pc: string;
    public mc: string;
    public launch: string;
    public taskArray=[{}];

    constructor(urgency: number, name: string, pc: string, mc: string, launch: string, taskArray ) {
        this.urgency = urgency;
        this.name = name;
        this.pc = pc;
        this.mc = mc;
        this.launch = launch;
        this.taskArray = taskArray;
    }

}
