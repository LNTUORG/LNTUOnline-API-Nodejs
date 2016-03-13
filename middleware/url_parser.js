/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

module.exports = function (req, res, next, value) {
  req.lntu_url_id = value;
  next();
};