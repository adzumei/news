import express from 'express';
import {CommentItem, CommentWithoutId} from "../../types";
import {fileDb} from "../../fileDb";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
    const newsId = req.query.news_id as string | undefined;
    const items: CommentItem[] = await fileDb.getComments(newsId);
    res.send(items);
});

commentsRouter.post('/', async (req, res) => {
    const { newsId, author, text } = req.body as {
        newsId?: string;
        author?: string;
        text?: string;
    };

    if (!newsId) {
        return res.status(400).send({ error: 'newsId is required' });
    }
    const news = await fileDb.getNewsById(newsId);
    if (!news) {
        return res.status(400).send({ error: 'News with provided newsId does not exist' });
    }
    if (!text) {
        return res.status(400).send({ error: 'Comment text is required' });
    }

    const newItem: CommentWithoutId = {
        newsId,
        author: author && author.trim() ? author : 'Anonymous',
        text,
    };

    const saved: CommentItem = await fileDb.addComment(newItem);
    res.status(201).send(saved);
});

commentsRouter.delete('/:id', async (req, res) => {
    const comment = await fileDb.getCommentById(req.params.id);
    if (!comment) {
        return res.status(404).send({ error: 'Comment not found' });
    }
    await fileDb.deleteCommentById(req.params.id);
    res.send({ message: 'Deleted' });
});

export default commentsRouter;
