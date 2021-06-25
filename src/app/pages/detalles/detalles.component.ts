import { Component, OnInit } from '@angular/core';
import { InvoiceInfo } from '../../models/InvoiceInfo';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  public invoice = {
    "Fecha": "Sin información",
    "Hora": "Sin información",
    "Consumo (Wh)": "Sin información",
    "Precio (€/kWh)": "Sin información",
    "Coste por hora (€)": "Sin información"
  }

  private id = '';

  constructor( private route: ActivatedRoute, private _invoiceService: InvoiceService ) { }

  ngOnInit(): void {
    this.getId();
    this.getInvoice( this.id );
  }

  getId(){

    this.route.params.subscribe( params => {
      this.id = params.id; // Consigo el id por URL y luego ejecuto la función para conseguir la data
    });

  }

  getInvoice( id: any ){

    this._invoiceService.getInvoice( id ).subscribe( (resp: any) => {

      this.invoice = resp.invoice;

    });



  }

}
