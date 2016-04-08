'use strict';

const express = require('express');
const router = express.Router();
const mailer = require(__base + '/lib/mailer');
const Customer = require(__base + '/models/customer');
const Accountant = require(__base + '/models/accountant');

/**
 * @api {post} /accountant/customers Create a customer
 * @apiName CreateCustomers
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} x-access-token Accountant unique access token
 *
 * @apiParam {String} name Customer full name
 * @apiParam {String} company_name Customer company name
 * @apiParam {String} email Customer Email
 * @apiParam {String} phone Customer Phone
 * @apiParam {String} tax_id Customer Tax Id
 * @apiParam {String="monthly","quarterly"} settlement_period Customer settlement period
 * @apiParam {Boolean} vat_payer Customer pays VAT
 * @apiParam {Boolean} social_security_payer Customer pays ZUS
 * @apiParam {Boolean} has_employees Customer has employees
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
 *   created_at: "2016-01-30T22:44:22.353Z"
 * }
 */

router.post('/', function (req, res, next) {
  let customer = new Customer({
    accountantId: req.accountantId,
    name: req.body.name, companyName: req.body.companyName,
    email: req.body.email, phone: req.body.phone, taxId: req.body.taxId,
    settlementPeriod: req.body.settlementPeriod, vatPayer: req.body.vatPayer,
    socialSecurityPayer: req.body.socialSecurityPayer, hasEmployees: req.body.hasEmployees
  });

  customer.save(function (err) {
    if (err) { return next(err); }

    res.status(200).json(customer);
  });
});

/**
 * @api {get} /accountant/customers/:id Get customer data
 * @apiName GetCustomer
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} x-access-token Accountant unique access token
 *
 * @apiSuccess {String} name Customer full name
 * @apiSuccess {String} company_name Customer company name
 * @apiSuccess {String} email Customer Email
 * @apiSuccess {String} phone Customer Phone
 * @apiSuccess {String} tax_id Customer Tax Id
 * @apiSuccess {String="monthly","quarterly"} settlement_period Customer settlement period
 * @apiSuccess {Boolean} vat_payer Customer pays VAT
 * @apiSuccess {Boolean} social_security_payer Customer pays ZUS
 * @apiSuccess {Boolean} has_employees Customer has employees
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
 *   created_at: "2016-01-30T22:44:22.353Z"
 * }
 */

router.get('/:id', function (req, res, next) {
  Customer.findOne({ accountantId: req.accountantId, _id: req.params.id }, function (err, customer) {
    if (err) { return next(err); }

    res.status(200).json(customer);
  });
});

/**
 * @api {put} /accountant/customers/:id Update customer
 * @apiName UpdateCustomers
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} x-access-token Accountant unique access token
 *
 * @apiParam {String} name Customer full name
 * @apiParam {String} company_name Customer company name
 * @apiParam {String} email Customer Email
 * @apiParam {String} phone Customer Phone
 * @apiParam {String} tax_id Customer Tax Id
 * @apiParam {String="monthly","quarterly"} settlement_period Customer settlement period
 * @apiParam {Boolean} vat_payer Customer pays VAT
 * @apiParam {Boolean} social_security_payer Customer pays ZUS
 * @apiParam {Boolean} has_employees Customer has employees
 *
 * @apiSuccess (204) null
 */

router.put('/:id', function (req, res, next) {
  let query = { accountantId: req.accountantId, _id: req.params.id };

  Customer.findOneAndUpdate(query, req.body, function (err, customer) {
    if (err) { return next(err); }

    res.status(204).json(null);
  });
});

/**
 * @api {put} /accountant/customers/:id/invitation Sent invitation to customer
 * @apiName InvitationCustomer
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} x-access-token Accountant unique access token
 * @apiSuccess (204) null
 */

router.put('/:id/invitation', function (req, res, next) {
  let query = { accountantId: req.accountantId, _id: req.params.id };

  Accountant.findById(req.accountantId, function (err, accountant) {
    if (err) { return next(err); }

    Customer.findOne(query, req.body, function (err, customer) {
      if (err) { return next(err); }

      mailer.accountantInvitation(accountant, customer, function (err) {
        if (err) { return next(err); }

        res.status(204).json(null);
      });
    });
  });
});

/**
 * @api {delete} /accountant/customers/:id Delete customer
 * @apiName DeleteCustomers
 * @apiGroup Customer
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} x-access-token Accountant unique access token
 *
 * @apiSuccess (204) null
 */

router.delete('/:id', function (req, res, next) {
  let query = { accountantId: req.accountantId, _id: req.params.id };

  Customer.remove(query, function (err) {
    if (err) { return next(err); }

    res.status(204).json(null);
  });
});

module.exports = router;
