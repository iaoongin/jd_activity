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
        response.writeHeader(404, {
            "Content-Type": "text/html"
        });
        response.end(`
            <html>
              <head>
                <title>NOT FOUND</title>
              </head>
              <body>
                <h1>404 NOT FOUND</h1>
              </body>
            </html>
          `);

        return
    } else if (errorType === 'NO_AUTH') {
        response.writeHeader(403, {
            "Content-Type": "text/html"
        });
        response.end(`
            <html>
              <head>
                <title>NOT AUTH</title>
              </head>
              <body>
                <h1>404 NOT AUTH</h1>
              </body>
            </html>
          `);

        return
    }

    response.writeHeader(500, {
        "Content-Type": "text/html"
    });
    response.end(`
        <html>
          <head>
            <title>SERVER ERROR</title>
          </head>
          <body>
            <h1>SERVER ERROR</h1>
          </body>
        </html>
      `);
}

function authCheck(request, response) {
    var pathName = url.parse(request.url).pathname;

    if(!pathName.startsWith('/api')){
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


router.use(function timeLog(request, response, next) {

    // auth check
    if (!authCheck(request, response)) {
        return;
    }
    next()
})


module.exports = router