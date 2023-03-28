import 'dotenv/config'
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from 'http-errors';
import morgan from 'morgan';
import listRoute from './routes/ListRoutes'
import UserRoute from './routes/UserRoute'
import path from "path";
import session from "express-session";
import env from './util/validateEnv';
import MongoStore from 'connect-mongo';
import { requiresAuth } from './Middleware/authMiddleware';

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(session({
   secret: env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
   cookie: {
      maxAge: 60 * 60 * 1000,
   },
   rolling: true,
   store: MongoStore.create({
      mongoUrl: env.MONGO_URI
   }),
}));
app.use('/api/todolist', requiresAuth, listRoute);
app.use('/api/users', UserRoute);
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
app.use((req, res, next) => {
   next(createHttpError(404, "Endpoint Not Found !"))
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
   console.error(error);
   let errorMessage = 'An Unknown Error occured';
   let statuscode = 500;
   if (isHttpError(error)) {
      statuscode = error.status;
      errorMessage = error.message;
   }
   res.status(statuscode).json({ error: errorMessage })
});




export default app;