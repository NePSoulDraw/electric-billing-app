const { model, Schema } = require('mongoose');

const InvoiceSchema = Schema({
    // MongoDB no soporta los elementos como el "." o "$",
    // por lo tanto he decidido dejarlos como String

    "Fecha": {
        type: String,
        required: true
    },

    "Hora": {
        type: String,
        required: true
    },

    "Consumo (Wh)": {
        type: String,
        required: true
    },

    "Precio (€/kWh)": {
        type: String,
        required: true
    },

    "Coste por hora (€)": {
        type: String,
        required: true
    }

});

InvoiceSchema.methods.toJSON = function() {

    const { __v, _id, ...invoice } = this.toObject();
    invoice.id = _id;
    return invoice;

}

module.exports = model('Invoice', InvoiceSchema);