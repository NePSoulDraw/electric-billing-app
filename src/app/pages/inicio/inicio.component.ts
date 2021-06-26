import { Component, OnInit } from '@angular/core';
import { InvoiceInfo } from '../../models/InvoiceInfo';
import { InvoiceSend } from '../../models/InvoiceSend';
import { InvoiceService } from '../../services/invoice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public fileToUpload: File | null = null;

  public invoices: InvoiceInfo[] = [];

  public state: boolean = false;

  public csvState: boolean = false;

  public alert: boolean = false;

  public invoiceForm: InvoiceSend = {
    fecha: '',
    hora: '',
    consumo: '',
    precio: '',
    costeHora: ''
  }

  constructor( private _invoiceService: InvoiceService, private router: Router ) { }

  ngOnInit(){
    this.getinvoices();
  }

  getinvoices(){

    this._invoiceService.getInvoices().subscribe( (response: any) => {
        this.invoices = response.invoices;
    });


  }

  goDetails( id: any ){

    this.router.navigate([`/detalles/${ id }`]);

  }

  postInvoice(formulario: any){
    this._invoiceService.postInvoice(this.invoiceForm).subscribe( resp => {
      this.getinvoices();
      formulario.reset();
      const aviso = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true
      });

      aviso.fire({
        icon: 'success',
        title: 'Se ha creado una nueva factura'
      });
      
    });
  }

  deleteAllInvoices(){

    Swal.fire({
      title: 'Aviso',
      icon: "warning",
      text: "¿Seguro que quieres eliminar todas las facturas?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'red'
    }).then( (data) => {

      if(data.isConfirmed == true){
        this._invoiceService.deleteAllInvoices().subscribe( resp => {

          const aviso = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true
          });

          aviso.fire({
            icon: 'success',
            title: 'Se han eliminado todos los datos'
          });

        });

        this.invoices = [];
      
      }

    });
  }

  loadCSV(){

    if( this.fileToUpload?.name.includes('.csv') ){
      console.log("Formato correcto CSV");
      this.csvState = false;

      this._invoiceService.postCSV(this.fileToUpload).subscribe( resp => {

        this.alert = true;

        setTimeout(() => {
          const aviso = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true
          });
    
          aviso.fire({
            icon: 'success',
            title: 'Se ha añadido todo el registro del fichero .csv a la base de datos'
          });

          this.alert = false;
          
          this.getinvoices();
        }, 1000);

      });


    }else{
      this.csvState = true;
    }

  }

  handleFileInput(file: any) {
      this.fileToUpload = file.target.files.item(0);
      this.csvState = false;
  }


}
