const App = require('yeps');
const error = require('yeps-error');
const http = require('http');
const chai = require('chai');
const chaiHttp = require('chai-http');
const wrapper = require('..');
const expect = chai.expect;
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');

chai.use(chaiHttp);
let app;

describe('YEPS express wrapper test', () => {

    beforeEach(() => {
        app = new App();
    });

    it('should test next()', async () => {
        let isTestFinished1 = false;
        let isTestFinished2 = false;
        let isTestFinished3 = false;

        app.then(wrapper((req, res, next) => {
            isTestFinished1 = true;
            next();
        }));
        app.then(async ctx => {
            isTestFinished2 = true;
            ctx.res.writeHead(200);
            ctx.res.end('test');
        });

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('test');
                isTestFinished3 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.true;
        expect(isTestFinished3).is.true;
    });

    it('should test next(error)', async () => {
        let isTestFinished1 = false;
        let isTestFinished2 = false;
        let isTestFinished3 = false;

        app.all([
            error(),
        ]);

        app.then(wrapper((req, res, next) => {
            isTestFinished1 = true;
            next(new Error('error'));
        }));
        app.then(async ctx => {
            isTestFinished2 = true;
            ctx.res.writeHead(200);
            ctx.res.end('test');
        });

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .catch(err => {
                expect(err).to.have.status(500);
                expect(err.message).to.be.equal('Internal Server Error');
                isTestFinished3 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.false;
        expect(isTestFinished3).is.true;
    });

    it('should test without next = res.end()', async () => {
        let isTestFinished1 = false;
        let isTestFinished2 = false;
        let isTestFinished3 = false;

        app.then(wrapper((req, res) => {
            isTestFinished1 = true;
            res.writeHead(200);
            res.end('next');
        }));
        app.then(async ctx => {
            isTestFinished2 = true;
            ctx.res.writeHead(200);
            ctx.res.end('test');
        });

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('next');
                isTestFinished3 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.false;
        expect(isTestFinished3).is.true;
    });

    it('body-parser', async () => {
        let isTestFinished1 = false;
        let isTestFinished2 = false;

        app.then(wrapper(bodyParser.json()));
        app.then(async ctx => {
            isTestFinished1 = true;
            ctx.res.writeHead(200, {'Content-Type': 'application/json'});
            ctx.res.end(JSON.stringify(ctx.req.body));
        });

        await chai.request(http.createServer(app.resolve()))
            .get('/')
            .set('Content-Type', 'application/json')
            .send('{"user":"test"}')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('{"user":"test"}');
                expect(res.body).is.an('object');
                expect(res.body).to.have.property('user');
                expect(res.body.user).is.not.empty;
                expect(res.body.user).to.be.equal('test');
                isTestFinished2 = true;
            });

        expect(isTestFinished1).is.true;
        expect(isTestFinished2).is.true;
    });

    it('serve-favicon', async () => {
        let isTestFinished = false;

        app.then(wrapper(favicon(path.join(__dirname, 'public', 'favicon.ico'))));

        await chai.request(http.createServer(app.resolve()))
            .get('/favicon.ico')
            .send()
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.headers['content-type']).to.be.equal('image/x-icon');
                expect(res.headers.etag).is.not.empty;
                expect(res.headers['cache-control']).is.not.empty;
                isTestFinished = true;
            });

        expect(isTestFinished).is.true;
    });

});
