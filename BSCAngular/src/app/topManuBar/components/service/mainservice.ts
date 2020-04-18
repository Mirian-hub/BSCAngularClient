import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {GroupViewModel} from '../clientModels/groupTableModel';
import {ListViewModel} from '../clientModels/listTableModel';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {TabService} from '../../tab.service';
// tslint:disable-next-line: class-name
@Injectable({
    providedIn: 'root'
})
export class AppService {
    gridIsLoaded: boolean;
    gridIsLoadedChnaged: Subject<boolean> = new Subject<boolean>();
    listViewModel: ListViewModel[];
    listSharedData: BehaviorSubject<ListViewModel[]>;
    groupSharedData: BehaviorSubject<GroupViewModel[]>;
    termCode: string; termName: string; termFormat: string;
    termType: string[];
    termStatus = ['Active', 'Passive'];
    groupDatasource: ListViewModel[];
    termGroup: string[];    readonly BaseUrl = 'http://localhost:49946/api/';
    constructor(private http: HttpClient, private service: TabService) {
        this.gridIsLoaded = false;
        this.gridIsLoadedChnaged.subscribe((value) => {
            this.gridIsLoaded = value;
        });
        this.listSharedData = new BehaviorSubject(this.listViewModel);
    }
    public getNewtabData() {
        this.getGroupView().subscribe(
            data => {this.listViewModel = data; },
            (error) => { alert(error); },
            () => {this.gridIsLoadedChnaged.next(true); },
        );
        this.listSharedData = new BehaviorSubject(this.listViewModel);
    }
    public getGroupView(): Observable<ListViewModel[]> {
        return this.http.get<ListViewModel[]>(this.BaseUrl + 'listview' + '/' + TabService.selectedOperationId).pipe(
            tap(_ => console.log('fetched'))
        );
    }

}
