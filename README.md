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

    const path = require('path');
    const App = require('yeps');
    const error = require('yeps-error');
    const Router = require('yeps-router');
    
    const server = require('yeps-server');
    const wrapper = require('yeps-express-wrapper');
    
    const app = new App();
    const router = new Router();
    
    // express middleware
    const favicon = require('serve-favicon');
    
    app.then(wrapper(favicon(path.join(__dirname, 'public', 'favicon.ico'))));
    
    app.then(error());
    
    router.get('/').then(async ctx => {
        ctx.res.statusCode = 200;
        ctx.res.end('test');
    });
    
    app.then(router.resolve());
    
    server.createHttpServer(app);
    
    
#### [YEPS documentation](http://yeps.info/)yeps-bodyparser](https://github.com/evheniy/yeps-bodyparser) - YEPS body parser
