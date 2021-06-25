const { Router } = require('express');
const { check } = require('express-validator');

const { postCSV } = require('../controllers/invoiceCSV');

const router = Router();

router.post('/', postCSV);

module.exports = router;

