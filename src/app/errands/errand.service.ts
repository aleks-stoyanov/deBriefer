import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';



import { Errand } from './errand.model';


export class ErrandService {
    errandsChanged = new Subject<Errand[]>();
    errandSelected = new EventEmitter<Errand>();    

    private errands: Errand[] = [
    //     new Errand('25', 12, "[1129] Canon Austria Mobile Money Cashback", "Martin Nenchev | Janice Janice | 26/10/2016", 
    //     [ {progress: '25', taskName: 'Name of Task1', taskID: '#', taskAssignee:'Aleksandar Stoyanov', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
    //       {progress: '85', taskName: 'Name of Task2', taskID: '#', taskAssignee:'Aleksandar Stoyanov', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
    //       {progress: '68', taskName: 'Name of Task3', taskID: '#', taskAssignee:'Aleksandar Stoyanov', taskStart: '23/07/2017', taskEnd:'27/07/2017'}
    //     ]),
    //     new Errand('25', 12, "[0000] Canon Austria Mobile Money Cashback", "Martin Nenchev | Janice Janice | 26/10/2016", 
    //     [ {progress: '25', taskName: 'Name of Task1', taskID: '#', taskAssignee:'Aleksandar Stoyanov', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
    //     {progress: '85', taskName: 'Name of Task2', taskID: '#', taskAssignee:'Aleksandar Stoyanov', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
    //     {progress: '68', taskName: 'Name of Task3', taskID: '#', taskAssignee:'Aleksandar Stoyanov', taskStart: '23/07/2017', taskEnd:'27/07/2017'}
    //   ])
    ];

    setErrands(errands: Errand[]) {
        this.errands=errands;
        this.errandsChanged.next(this.errands.slice());
        console.log(this.errands);
    }
    getErrands() {
        return this.errands.slice();
    }

    addErrand(errand:Errand){
        this.errands.push(errand);
        this.errandsChanged.next(this.errands.slice());
        console.log(this.errands);
    }

    replaceErrand(errand:Errand){
        for(let localErrand of this.errands){
            if (localErrand.apiID !== errand.apiID) {
                this.errands.push(errand);
                this.errandsChanged.next(this.errands.slice());           
            }
        }        
    }

    
}