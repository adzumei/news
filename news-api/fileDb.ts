import { promises as fs } from 'fs';
import path from 'path';
import config from './config';
import type { DatabaseSchema } from './types';

const dbPath = path.join(config.rootPath, '..', 'db.json');

let db: DatabaseSchema = { news: [], comments: [] };

export const fileDb = {
    init: async (): Promise<void> => {
        try {
            const raw = await fs.readFile(dbPath);
            db = JSON.parse(raw.toString());
        } catch {
            db = { news: [], comments: [] };
            await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
        }
    },
    save: async (): Promise<void> => {
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
    }
};
