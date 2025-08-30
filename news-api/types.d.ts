export interface News {
    id: string;
    title: string;
    content: string;
    image: string | null;
    createdAt: string;
}

export interface NewsWithoutId {
    title: string;
    content: string;
    image: string | null;
    createdAt: string;
}

export type NewsListItem = Omit<News, 'content'>;

export interface CommentItem {
    id: string;
    newsId: string;
    author: string;
    text: string;
}

export interface CommentWithoutId {
    newsId: string;
    author: string;
    text: string;
}

export interface DatabaseSchema {
    news: News[];
    comments: CommentItem[];
}
