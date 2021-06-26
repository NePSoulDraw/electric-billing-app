import { Component, OnInit } from '@angular/core';
import { InvoiceInfo } from '../../models/InvoiceInfo';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';

import Swal from 'sweetalert2';
import { InvoiceSend } from '../../models/InvoiceSend';

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

  private id: string = '';

  public invoiceEdited: InvoiceSend = {
    fecha: '',
    hora: '',
    consumo: '',
    precio: '',
    costeHora: '' 
  }

  form_state: boolean = false;

  constructor( private router: Router, 
               private route: ActivatedRoute, 
               private _invoiceService: InvoiceService ) { }

  ngOnInit(): void {
    this.getId();
    this.getInvoice( this.id );
  }

  getId(){

    this.route.params.subscribe( params => {
      this.id = params.id; // Consigo el id por URL y luego ejecuto la función para conseguir la data
    });

  }

  getInvoice( id: string ){

    this._invoiceService.getInvoice( id ).subscribe( (resp: any) => {

      this.invoice = resp.invoice;

    });

  }

  deleteInvoice(){

    Swal.fire({
      title: 'Aviso',
      icon: "warning",
      text: "¿Seguro que quieres eliminar esta factura?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'red'
    }).then( (data) => {

      if(data.isConfirmed == true){
        
          this._invoiceService.deleteInvoice( this.id ).subscribe(resp => {

            const aviso = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true
            });

            aviso.fire({
              icon: 'success',
              title: 'Se ha eliminado la factura'
            });

            this.router.navigate([`/inicio`]);

          });


        }
      
      }

    );

  }

  showForm(){

    this.form_state = !this.form_state

  }

  updateInvoice( form: any ){

    this._invoiceService.updateInvoice( this.id, this.invoiceEdited ).subscribe( resp => {

      form.reset();
      this.showForm();

      this.getInvoice( this.id );

      const aviso = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true
      });

      aviso.fire({
        icon: 'success',
        title: 'La factura se ha editado correctamente'
      });
      
    });


  }

}
