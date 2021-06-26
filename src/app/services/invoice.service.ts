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
  private pathCSV: string = 'http://localhost:8080/api/invoiceCSV/'

  constructor( private http: HttpClient ) { }

  getInvoices(): Observable<any>{

    return this.http.get(this.pathInvoices).pipe(
      catchError( ( err ) => {
        return of(err);
      })
    );

  }

  getInvoice( id:string ): Observable<any>{

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

  updateInvoice( id: string, invoice: InvoiceSend ){

    return this.http.put(`${ this.pathInvoices }/${ id }`, invoice).pipe(
      catchError( ( err ) => {
        return of(err);
      })
    );

  }

  deleteAllInvoices():Observable<any>{

    return this.http.delete(this.pathInvoices).pipe(
      catchError( ( err ) => {
        return of(err);
      })
    );

  }

  deleteInvoice( id: string ):Observable<any>{

    return this.http.delete(`${ this.pathInvoices }/${ id }`).pipe(
      catchError( ( err ) => {
        return of(err);
      })
    );

  }

  postCSV( fileToUpload: File ): Observable<any> {

    const formData: FormData = new FormData();

    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http.post(this.pathCSV, formData).pipe(
      catchError( ( err ) => {
          return of(err);
        })
      );

  }



}
