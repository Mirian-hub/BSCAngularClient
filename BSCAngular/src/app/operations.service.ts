import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  readonly  BaseUrl = 'http://localhost:56231/Operations';
  readonly  BaseUrl2 = 'http://localhost:56231/OperationsName';
  result: any;
  operationNames: any = [];
  operationValues: any = [] ;
  operationNamesFin: any = [];
  operationValuesFfin: any = [] ;
  selectedOperationId: number;

  constructor(private http: HttpClient) {
   }
   getOperationsName() {
    return this.http.get(this.BaseUrl2);
   }
   getOperationsValues() {
     return this.http.get(this.BaseUrl);
   }

   getSourceDate(typep: string) {
    this.operationNames = this.getOperationsName();
    this.operationValues = this.getOperationsValues();
    if (typep === 'name') {
      this.operationNames.forEach(element => {
      this.operationNamesFin.push(element);
     });
      return this.operationNamesFin;
    } else if (typep === 'value') {
      this.operationValues.forEach(element => {
        this.operationValuesFfin.push(element);
      });
      return this.operationValuesFfin; 
      let tmp = 9;
     }
   }
}
