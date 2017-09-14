import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';



import { Errand } from './errand.model';


export class ErrandService {
    errandsChanged = new Subject<Errand[]>();
    errandSelected = new EventEmitter<Errand>();

    

    private errands: Errand[] = [
        new Errand(12, "[1129] Canon Austria Mobile Money Cashback", "Martin Nenchev", "Janice Janice", "26/10/2016", 
        [ {progress: '25', phase: 'Coordination', phaseID: 'cd', taskName: 'Name of Coordination Task1', taskURL: '#', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
          {progress: '85', phase: 'Design', phaseID: 'ds', taskName: 'Name of Design Task1', taskURL: '#', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
          {progress: '68', phase: 'Front End', phaseID: 'fe', taskName: 'Name of Slice Task1', taskURL: '#', taskStart: '23/07/2017', taskEnd:'27/07/2017'}
        ]),
        new Errand(12, "[xxxx] Canon Austria Mobile Money Cashback", "Martin Nenchev", "Janice Carlin", "26/10/2016", 
        [ {progress: '25', phase: 'Coordination', phaseID: 'cd', taskName: 'Name of Coordination Task1', taskURL: '#', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
          {progress: '85', phase: 'Design', phaseID: 'ds', taskName: 'Name of Design Task1', taskURL: '#', taskStart: '23/07/2017', taskEnd:'27/07/2017'},
          {progress: '68', phase: 'Front End', phaseID: 'fe', taskName: 'Name of Slice Task1', taskURL: '#', taskStart: '23/07/2017', taskEnd:'27/07/2017'}
        ])
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
    // updateErrand(index: number, newErrand:Errand){
    //     this.errands[index] = newErrand;
    // }

    
}