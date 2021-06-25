import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { InvoiceInfo } from '../models/InvoiceInfo';
import { InvoiceSend } from '../models/InvoiceSend';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private pathInvoices: string = 'http://localhost:8080/api/invoices/';

  constructor( private http: HttpClient ) { }

  getInvoices(): Observable<any>{

    return this.http.get(this.pathInvoices).pipe(
      catchError( ( err ) => {
        return of(err);
      })
    );

  }

  getInvoice( id:any ): Observable<any>{

    return this.http.get(`${ this.pathInvoices }/${ id }`).pipe(
      catchError( ( err ) => {
        return of(err);
      })
    );

  }

  postInvoice( invoice: InvoiceSend ):Observable<any>{

    return this.http.post(this.pathInvoices, invoice).pipe(
      catchError( ( err ) => {
        return of(err);
      })
    );

  }

  deleteAllInvoices(){

    return this.http.delete(this.pathInvoices).pipe(
      catchError( ( err ) => {
        return of(err);
      })
    );

  }



}
