import express from 'express';
import { PORT, MONGO_URL } from './config.js';
import { router as userRouter } from './routes/userRouter.js';
import { router as apiRouter } from './routes/apiRouter.js';
import { router as mainRouter} from './routes/index.js';
import {router as booksRouter} from './routes/booksRouter.js';
import { logger } from './middleware/logger.js';
import { error } from './middleware/error.js';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import { initPassport } from './passport/init.js';
import flash from 'connect-flash';
import { dirname } from 'path';
import * as path from 'path';
import { fileURLToPath} from 'url';
import {initComments} from './comment/comment.js';
import * as http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));

mongoose.connect(MONGO_URL);

const app = express();

const server = http.Server(app);

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());
app.use('/load', express.static(path.join(__dirname, '..', 'load')));
app.use(express.static('public'));

app.use(session({ secret: 'SECRET', resave: true, saveUninitialized: true }));

app.use(logger);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

initPassport(passport);

app.use('/', mainRouter);
app.use('/api/user', userRouter);
app.use('/api/books', booksRouter);
app.use('/api', apiRouter);

app.use(error);

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

initComments(server);

