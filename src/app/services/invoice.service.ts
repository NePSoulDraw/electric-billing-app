import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InvoiceInfo } from '../models/InvoiceInfo';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private pathInvoices: string = 'http://localhost:8080/api/invoices/';

  constructor( private http: HttpClient ) { }

  getInvoices(): Observable<any>{

    return this.http.get(this.pathInvoices);

  }



}
