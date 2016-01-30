var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var Customer = require('../models/customer');

/**
 * @api {post} /customers Create a customer
 * @apiName CreateCustomers
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiSuccess {String} name Customer full name
 * @apiSuccess {String} company_name Customer company name
 * @apiSuccess {String} email Customer Email
 * @apiSuccess {String} phone Customer Phone
 * @apiSuccess {String} tax_id Customer Tax Id
 * @apiSuccess {String} settlement_period Customer settlement period [monthly, quarterly]
 *
 * @apiSuccessExample Example data on success:
 * {
 *   _id: "asdfasdfasdffd",
 *   name: "Jan Kowalski",
 *   company_name: "PolKrak",
 *   email: "kowalski@gmail.com",
 *   phone: "+48 333 222 111",
 *   tax_id: "PL123432134",
 *   settlement_period: "quarterly",
 *   vat_payer: true,
 *   social_security_payer: true,
 *   has_employees: false,
 *   created_at: "PL123432134"
 * }
 */

router.post('/', auth, function(req, res, next) {
  var customer = new Customer({
    accountant: req.accountant.id,
    name: req.body.name, company_name: req.body.company_name,
    email: req.body.email, phone: req.body.phone, tax_id: req.body.tax_id,
    settlement_period: req.body.settlement_period, vat_payer: req.body.vat_payer,
    social_security_payer: req.body.social_security_payer, has_employees: req.body.has_employees
  });

  customer.save(function(err) {
    if (err) { return next(err); }
    res.status(200).json(customer);
  });
});

/**
 * @api {get} /customers/:id Get customer data
 * @apiName GetCustomer
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiSuccessExample Example data on success:
 * {
 *   _id: "asdfasdfasdffd",
 *   name: "Jan Kowalski",
 *   company_name: "PolKrak",
 *   email: "kowalski@gmail.com",
 *   phone: "+48 333 222 111",
 *   tax_id: "PL123432134",
 *   settlement_period: "quarterly",
 *   vat_payer: true,
 *   social_security_payer: true,
 *   has_employees: false,
 *   created_at: "PL123432134"
 * }
 */

router.get('/:id', auth, function(req, res, next) {
  Customer.findById(req.params.id, function(err, customer) {
    if (err) { return next(err); }
    res.status(200).json(customer);
  });
});

module.exports = router;
