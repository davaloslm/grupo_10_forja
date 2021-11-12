/* ///////////Modulos y Middlewares//////////////////// */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride =  require('method-override');
const session = require('express-session');
const localsUser = require("./middlewares/localsUser");
const cookieRecordarme = require('./middlewares/cookieRecordarme');

/* /////////////////Archivos de rutas////////////////////// */
const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const detailRouter = require("./routes/detailRouter"); 
const categoriasRouter = require("./routes/categoriasRouter");
const adminRouter = require("./routes/adminRouter");
const productsRouter = require("./routes/productsRouter")

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(methodOverride('_method'));
app.use(session( {secret: "secret"}));
app.use(localsUser);
app.use(cookieRecordarme);

/* ///////Archivos de rutas////////// */
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/product', detailRouter);
app.use('/products', productsRouter); //Todos los productos
app.use('/categories', categoriasRouter); //Ruta para las categorías
app.use('/admin', adminRouter); //Ruta para las admin




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
  res.render('cuatrocientosCuatro');
});

module.exports = app;
