export interface NewsListItem {
    id: string;
    title: string;
    image: string | null;
    createdAt: string;
}

export interface News {
    id: string;
    title: string;
    content: string;
    image: string | null;
    createdAt: string;
}

export interface CommentItem {
    id: string;
    newsId: string;
    author: string;
    text: string;
}
