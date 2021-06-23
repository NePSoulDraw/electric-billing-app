const { Router } = require('express');
const { check } = require('express-validator');

const invoiceExists = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');
const { InvoicesGet,
        InvoiceGet,
        InvoicePost,
        InvoicePut,
        InvoiceDelete } = require('../controllers/invoices');


const router = Router();

router.get('/', InvoicesGet);

router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(invoiceExists),
    validateFields
], InvoiceGet);

router.post('/',  [
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('hora', 'La hora es obligatoria').not().isEmpty(),
    check('consumo', 'La información de consumo es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('costeHora', 'El coste por hora es obligatorio').not().isEmpty(),
    validateFields
], InvoicePost);

router.put('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(invoiceExists),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('hora', 'La hora es obligatoria').not().isEmpty(),
    check('consumo', 'La información de consumo es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('costeHora', 'El coste por hora es obligatorio').not().isEmpty(),
    validateFields
], InvoicePut);

router.delete('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(invoiceExists),
    validateFields
], InvoiceDelete);

module.exports = router;