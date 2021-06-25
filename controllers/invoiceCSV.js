const { request, response } = require('express');
const csvtojson = require('csvtojson');

const { uploadFile } = require('../helpers/upload-file');

const postCSV = async( req = request, res = response ) => {
  
  try {
    
      if (!req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        res.status(400).json({msg: 'No hay archivos que subir'});
        return;
      }
      
      const name = await uploadFile(req.files);
    
      res.status(200).json({
        nombre: name
      });
    
  } catch (err) {
    res.status(400).json({
      msg: err
    });
  }


}

module.exports = { postCSV }