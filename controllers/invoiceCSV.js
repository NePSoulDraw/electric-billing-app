const { request, response } = require('express');
const csvtojson = require('csvtojson');

const Invoice = require('../models/invoice');
const { uploadFile } = require('../helpers/upload-file');

const postCSV = async( req = request, res = response ) => {
  
  try {
    
      if (!req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        res.status(400).json({msg: 'No hay archivos que subir'});
        return;
      }
      
      const array = await uploadFile(req.files);
    
      const csvJsonArray = await csvtojson().fromFile(array[1]);


      csvJsonArray.forEach( async function( invoiceCSV ) {

        console.log(invoiceCSV);
        const invoiceFull = new Invoice({ 
          
          "Fecha": invoiceCSV['Fecha'],
          "Hora": invoiceCSV['Hora'],
          "Consumo (Wh)": invoiceCSV['Consumo (Wh)'],
          "Precio (€/kWh)": invoiceCSV['Precio (€/kWh)'],
          "Coste por hora (€)": invoiceCSV['Coste por hora (€)'] });

          await invoiceFull.save();

      });

      res.status(200).json({
        nombre: array[0]
      });
    
  } catch (err) {
    res.status(400).json({
      msg: err
    });
  }


}

module.exports = { postCSV }