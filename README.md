# YEPS express wrapper

It helps run express middleware on YEPS

[![NPM](https://nodei.co/npm/yeps-express-wrapper.png)](https://npmjs.org/package/yeps-express-wrapper)

[![npm version](https://badge.fury.io/js/yeps-express-wrapper.svg)](https://badge.fury.io/js/yeps-express-wrapper)
[![Build Status](https://travis-ci.org/evheniy/yeps-express-wrapper.svg?branch=master)](https://travis-ci.org/evheniy/yeps-express-wrapper)
[![Coverage Status](https://coveralls.io/repos/github/evheniy/yeps-express-wrapper/badge.svg?branch=master)](https://coveralls.io/github/evheniy/yeps-express-wrapper?branch=master)
[![Linux Build](https://img.shields.io/travis/evheniy/yeps-express-wrapper/master.svg?label=linux)](https://travis-ci.org/evheniy/)
[![Windows Build](https://img.shields.io/appveyor/ci/evheniy/yeps-express-wrapper/master.svg?label=windows)](https://ci.appveyor.com/project/evheniy/yeps-express-wrapper)

[![Dependency Status](https://david-dm.org/evheniy/yeps-express-wrapper.svg)](https://david-dm.org/evheniy/yeps-express-wrapper)
[![devDependency Status](https://david-dm.org/evheniy/yeps-express-wrapper/dev-status.svg)](https://david-dm.org/evheniy/yeps-express-wrapper#info=devDependencies)
[![NSP Status](https://img.shields.io/badge/NSP%20status-no%20vulnerabilities-green.svg)](https://travis-ci.org/evheniy/yeps-express-wrapper)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/evheniy/yeps-express-wrapper/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/evheniy/yeps-express-wrapper.svg)](https://github.com/evheniy/yeps-express-wrapper/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/evheniy/yeps-express-wrapper.svg)](https://github.com/evheniy/yeps-express-wrapper/network)
[![GitHub issues](https://img.shields.io/github/issues/evheniy/yeps-express-wrapper.svg)](https://github.com/evheniy/yeps-express-wrapper/issues)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/evheniy/yeps-express-wrapper.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

## How to install

    npm i -S yeps-express-wrapper

## How to use

app.js

    const http = require('http');
    const App = require('yeps');
    const app = new App();
    const error = require('yeps-error');
    const Router = require('yeps-router');
    const router = new Router();
    const wrapper = require('yeps-express-wrapper');
    
    // express middleware
    const bodyParser = require('body-parser');
    const favicon = require('serve-favicon');
    const path = require('path');
    
    
    app.then(wrapper(favicon(path.join(__dirname, 'public', 'favicon.ico'))));
    app.all([
        error(),
        wrapper(bodyParser.json()),
    ]);
    
    router.get('/').then(async ctx => {
        console.log(ctx.req.body);
        ctx.res.writeHead(200);
        ctx.res.end('test');
    });
    
    app.then(router.resolve());
    
    
    http
        .createServer(app.resolve())
        .listen(parseInt(process.env.PORT || '3000', 10));
    
And
    
    node --harmony app.js
    
## Links

* [yeps](https://github.com/evheniy/yeps) - YEPS
* [yeps-router](https://github.com/evheniy/yeps-router) - YEPS promise based router
* [yeps-error](https://github.com/evheniy/yeps-error) - YEPS 404/500 error handler
* [yeps-redis](https://github.com/evheniy/yeps-redis) - YEPS promise based redis client
* [yeps-logger](https://github.com/evheniy/yeps-logger) - YEPS Async logger
* [yeps-boilerplate](https://github.com/evheniy/yeps-boilerplate) - YEPS app boilerplate
* [yeps-promisify](https://github.com/evheniy/yeps-promisify) - YEPS kernel
* [yeps-benchmark](https://github.com/evheniy/yeps-benchmark) - performance comparison koa2, express and node http
* [express](https://github.com/expressjs/express)