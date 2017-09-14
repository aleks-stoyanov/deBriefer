import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

import {ErrandService} from '../errands/errand.service';
import {Errand} from '../errands/errand.model';

@Injectable()

export class UserStorageService {
    constructor(private http: Http, private errandService: ErrandService) {}
    
    storeErrands(){
        return this.http.put('https://debriefer-a0341.firebaseio.com/errands.json', this.errandService.getErrands());
    }

    getErrands(){
        this.http.get('https://debriefer-a0341.firebaseio.com/errands.json')
            .subscribe(
                (response: Response) => {
                    const errands: Errand[] = response.json();
                    this.errandService.setErrands(errands);
                }
            );
    }

    getTasks(){
        const key:any = "twp_q96YiLmqi2Hg9C2B8DcmDbtWXi67";
        const headers = new Headers({"Authorization": "BASIC " + window.btoa(key + ":xxx")});
        return this.http.get('https://thetaxbackgroup.teamwork.com/projects.json', {headers});
    }
}