import express from 'express';
import { imagesUpload } from '../../multer';
import type { News, NewsListItem, NewsWithoutId } from '../../types';
import {fileDb} from "../../fileDb";
import config from "../../config";

const newsRouter = express.Router();

newsRouter.get('/', async (_req, res) => {
    const all = await fileDb.getNews();
    const items: NewsListItem[] = all
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map(({ id, title, image, createdAt }) => ({ id, title, image, createdAt }));

    res.send(items);
});

newsRouter.get('/:id', async (req, res) => {
    const item = await fileDb.getNewsById(req.params.id);
    if (!item) {
        return res.status(404).send({ error: 'News not found' });
    }
    res.send(item);
});

newsRouter.post(
    '/',
    imagesUpload.single('image'),
    async (req, res) => {
        const { title, content } = req.body as { title?: string; content?: string };

        if (!title || !content) {
            return res.status(400).send({ error: 'Title and content are required' });
        }

        let image: string | null = null;

        if (req.file) {
            image = `/images/${req.file.filename}`;
        } else {
            image = config.defaultImageUrl;
        }

        const newItem: NewsWithoutId = {
            title,
            content,
            image,
            createdAt: new Date().toISOString(),
        };

        const saved: News = await fileDb.addNews(newItem);
        res.status(201).send(saved);
    }
);

newsRouter.delete('/:id', async (req, res) => {
    const existing = await fileDb.getNewsById(req.params.id);
    if (!existing) {
        return res.status(404).send({ error: 'News not found' });
    }
    await fileDb.deleteNewsById(req.params.id);
    res.send({ message: 'Deleted' });
});

export default newsRouter;
