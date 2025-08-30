import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileDb } from './fileDb';
import config from './config';
import newsRouter from "./routers/news/news";
import commentsRouter from "./routers/comments/comments";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(config.publicPath)));

app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

const run = async (): Promise<void> => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    });
};

run().catch(console.error);
