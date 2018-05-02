process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

const mock = require('./mock.js');
const commons = require('./utils/commons');
mock.commons = commons;
const dbModule = require('./utils/db.js');
mock.connect = dbModule.connect();  
const mockServer = require('./middleware/mockServer.js');
const plugins = require('./plugin.js');
const websockify = require('koa-websocket');
const websocket = require('./websocket.js');

const Koa = require('koa');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const router = require('./router.js');
 
let indexFile = process.argv[2] === 'dev' ? 'dev.html' : 'index.html';


const app = websockify(new Koa());
app.proxy = true;
mock.app = app;

app.use(bodyParser({multipart: true}));
app.use(mockServer);
app.use(router.routes());
app.use(router.allowedMethods());

websocket(app);

app.use( async (ctx, next) => {
    if( /^\/(?!api)[a-zA-Z0-9\/\-_]*$/.test(ctx.path) ){
        ctx.path = "/"
        await next()
    }else{
        await next()
    }
    
})

app.use( async (ctx, next)=>{
    if(ctx.path.indexOf('/prd') === 0){
        ctx.set('Cache-Control', 'max-age=8640000000');
        if(mock.commons.fileExist( mock.path.join(mock.WEBROOT, 'static', ctx.path+'.gz') )){
            ctx.set('Content-Encoding', 'gzip')
            ctx.path = ctx.path + '.gz';            
        }
    }
    await next()
})

app.use(koaStatic(
    mock.path.join(mock.WEBROOT, 'static'),
    {index: indexFile, gzip: true}
));

app.listen(mock.WEBCONFIG.port);
commons.log(`the server is start at 127.0.0.1${ mock.WEBCONFIG.port == '80' ? '' : ':' + mock.WEBCONFIG.port}`); 