import express ,{Request, Response, NextFunction} from 'express';
import path from 'path';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors'
import multer from 'multer';
import fs from 'fs';



import indexRouter from './routes/index';
import usersRouter from './routes/users'; 
import connectDB from './config/database.config';
import router from './routes/users';

connectDB()


const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err:createError.HttpError, req:Request, res:Response, next:NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  

export default app;
