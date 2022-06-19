const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const logger = require('morgan');
const fileupload = require('express-fileupload');
const apiclient = require ('./routes/apiclient/index')
const serverRouter = require('./routes/server/index');
const usersRouter = require('./routes/server/users');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


const app = express();
const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Plagio Control API', 
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: ''
      }
    ]
  },
  apis: [`${path.join(__dirname, './routes/server/*.js')}`]
};

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)));
app.use('/', apiclient);
app.use("/server", serverRouter);
app.use('/users', usersRouter);

//Upload File
app.use(fileupload({
  limits: { fileSize: 12 * 1024 * 1024 },
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var port = 8000;
app.listen(port, () => {
  console.log("SOCKET ON " + port);
});
module.exports = app;
