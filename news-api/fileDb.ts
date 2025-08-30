import { promises as fs } from 'fs';
import { randomUUID } from 'node:crypto';
import path from 'path';
import config from './config';
import type {
    DatabaseSchema,
    News,
    NewsWithoutId,
    CommentItem,
    CommentWithoutId
} from './types';

const dbPath = path.join(config.rootPath, 'db.json');

let db: DatabaseSchema = { news: [], comments: [] };

export const fileDb = {
    init: async (): Promise<void> => {
        try {
            const raw = await fs.readFile(dbPath);
            db = JSON.parse(raw.toString());
            if (!db.news) db.news = [];
            if (!db.comments) db.comments = [];
        } catch (_e) {
            db = { news: [], comments: [] };
            await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
        }
    },

    save: async (): Promise<void> => {
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
    },

    getNews: async (): Promise<News[]> => db.news,

    addNews: async (item: NewsWithoutId): Promise<News> => {
        const news: News = { id: randomUUID(), ...item };
        db.news.push(news);
        await fileDb.save();
        return news;
    },

    getNewsById: async (id: string): Promise<News | undefined> =>
        db.news.find(n => n.id === id),

    deleteNewsById: async (id: string): Promise<void> => {
        db.news = db.news.filter(n => n.id !== id);
        db.comments = db.comments.filter(c => c.newsId !== id);
        await fileDb.save();
    },

    getComments: async (newsId?: string): Promise<CommentItem[]> => {
        if (newsId) {
            return db.comments.filter(c => c.newsId === newsId);
        }
        return db.comments;
    },

    addComment: async (item: CommentWithoutId): Promise<CommentItem> => {
        const comment: CommentItem = { id: randomUUID(), ...item };
        db.comments.push(comment);
        await fileDb.save();
        return comment;
    },

    getCommentById: async (id: string): Promise<CommentItem | undefined> =>
        db.comments.find(c => c.id === id),

    deleteCommentById: async (id: string): Promise<void> => {
        db.comments = db.comments.filter(c => c.id !== id);
        await fileDb.save();
    }
};
