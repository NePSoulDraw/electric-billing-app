import { Component, OnInit } from '@angular/core';
import { InvoiceInfo } from '../../models/InvoiceInfo';
import { InvoiceSend } from '../../models/InvoiceSend'
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public invoices: InvoiceInfo[] = [];

  constructor( private _invoiceService: InvoiceService ) { }

  ngOnInit(){
    this.getinvoices();
    setTimeout( () => {

      console.log(this.invoices);

    }, 1500);
  }

  getinvoices(){

    this._invoiceService.getInvoices().subscribe( (response: any) => {
        this.invoices = response.invoices;
    });


  }

}
