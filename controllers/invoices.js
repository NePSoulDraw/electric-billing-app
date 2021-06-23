const { response, request } = require('express');
const Invoice = require('../models/invoice');


const InvoicesGet = async( req=request, res=response ) => {

    [total, invoices] = await Promise.all([
        await Invoice.countDocuments(),
        await Invoice.find()
    ]);

    res.status(200).json({
        total,
        invoices
    });

}

const InvoiceGet = async( req=request, res=response ) => {

    const { id } = req.params;

    if (!id){
        res.status(400).json({
            msg: "La factura no existe"
        });
    }

    const invoice = await Invoice.findById(id);

    res.status(200).json({
        invoice
    });

}

const InvoicePost = async( req=request, res=response ) => {

    const { fecha, hora, consumo, precio, costeHora } = req.body;

    const invoice = new Invoice({ 
     "Fecha": fecha,
     "Hora": hora,
     "Consumo (Wh)": consumo,
     "Precio (€/kWh)": precio,
     "Coste por hora (€)": costeHora });

     await invoice.save();

     res.json({
         invoice
     });

}

const InvoicePut = async( req=request, res=response ) => {

    const invoice_id = req.params.id;
    const { fecha, hora, consumo, precio, costeHora } = req.body;

    const data = { 
        "Fecha": fecha,
        "Hora": hora,
        "Consumo (Wh)": consumo,
        "Precio (€/kWh)": precio,
        "Coste por hora (€)": costeHora };

    if(!invoice_id){
        res.status(400).json({
            msg: "La factura no existe"
        });
    }

     const updated_invoice = await Invoice.findByIdAndUpdate(invoice_id, data, {new: true});

     res.status(200).json({
         updated_invoice
     });

}

const InvoiceDelete = async( req=request, res=response ) => {

    const invoice_id = req.params.id;

    const invoiceExists = await Invoice.findById( invoice_id );

    if ( !invoiceExists ){
        return res.status(400).json({
            msg: 'La factura no existe, no se ha podido eliminar'
        });
    }

    await Invoice.findByIdAndRemove(invoice_id);

    res.status(200).json({
        msg: "Factura eliminada correctamente"
    });
}

module.exports = {
    InvoicesGet,
    InvoiceGet,
    InvoicePost,
    InvoicePut,
    InvoiceDelete
}