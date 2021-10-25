const url = require('url');
const path = require('path');
const fs = require('fs');
const auth = require('./auth.js');
const express = require('express')
const router = express.Router()


function getErrorInfo(errorType) {

}

function writeErrorPage(response, errorType) {

  if (errorType == 'NOT_FOUND') {
    var r = { msg: errorType, code: "404" };
    response.json(r);
    response.end();
    return
  } else if (errorType === 'NO_AUTH') {
    var r = { msg: errorType, code: "403" };
    response.json(r);
    response.end();
    return
  }

  var r = { msg: 'SERVER ERROR', code: "500" };
  response.json(r);
  response.end();
}

function authCheck(request, response) {
  var pathName = url.parse(request.url).pathname;

  if (!pathName.startsWith('/api')) {
    return true;
  }

  let token = request && request.query ? request.query.token : ''
  if (!token) {
    // console.log(request.headers)
    token = request && request.headers && request.headers['authorization'] ? request.headers['authorization'].substring('Bearer '.length) : ''
  }
  // console.log('request.query: ', request.query)
  // console.log('token: ', token)
  // console.log('WebToken: ', auth.WebToken)
  if (token != auth.WebToken) {
    writeErrorPage(response, 'NO_AUTH');
    return false;
  }

  return true;
}


router.use(function (request, response, next) {
  // auth check
  if (!authCheck(request, response)) {
    return;
  }
  next()
})

module.exports = router