var express = require('express');
var router = express.Router();

/**
 * @api {post} /accountants Create an accountant
 * @apiName CreateAccountant
 * @apiGroup Accountant
 * @apiVersion 0.1.0
 *
 * @apiParam {String} email Accountant email
 * @apiParam {String} password Accountant password
 *
 * @apiParamExample {json} Request example:
 * {
 *   "email": "accountant@example.com",
 *   "password": "some-password"
 * }
 *
 * @apiSuccess (Success 201) {String} token Token for accountant
 *
 * @apiSuccessExample Response example on success:
 * { "token": "abcdefghijkl" }
 */

router.post('/', function(req, res, next) {
  res.send('create a accountant');
});

module.exports = router;
