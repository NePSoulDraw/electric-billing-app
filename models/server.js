const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {

            invoices: '/api/invoices'

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

    }

    routes(){

        this.app.use( this.paths.invoices, require('../routes/invoices') );

    }
    

    listen(){

        this.app.listen( this.port, () => {
            console.log(`Server working (Port --> ${this.port})`);
        });

    }


}

module.exports = Server;