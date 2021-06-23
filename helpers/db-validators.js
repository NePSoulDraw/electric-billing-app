const Invoice = require("../models/invoice");



const invoiceExists = async( id ) => {

    const invoice = await Invoice.findById( id );

    if ( !invoice ){
        throw new Error (`El id ${id} no existe`);
    }

}

module.exports = invoiceExists;