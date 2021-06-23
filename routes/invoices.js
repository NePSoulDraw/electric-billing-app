const { Router } = require('express');
const { check } = require('express-validator');
const { InvoicesGet,
        InvoiceGet,
        InvoicePost,
        InvoicePut,
        InvoiceDelete } = require('../controllers/invoices');


const router = Router();

router.get('/', InvoicesGet);

router.get('/:id', InvoiceGet);

router.post('/', InvoicePost);

router.put('/:id', InvoicePut);

router.delete('/:id', InvoiceDelete);

module.exports = router;