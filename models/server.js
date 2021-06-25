const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {

            invoices: '/api/invoices',
            invoiceCSV: '/api/invoiceCSV'

        }

        this.dbConnect();
        this.middlewares();
        this.routes();

    }

    async dbConnect(){

        await dbConnection();

    }


    middlewares(){

        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public') );

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

    }

    routes(){

        this.app.use( this.paths.invoices , require('../routes/invoices') );
        this.app.use( this.paths.invoiceCSV , require('../routes/invoiceCSV') );

    }
    

    listen(){

        this.app.listen( this.port, () => {
            console.log(`Server working (Port --> ${this.port})`);
        });

    }


}

module.exports = Server;