import React from 'react';
import type { NewsListItem } from '../types';
import { Link } from 'react-router-dom';

interface Props {
    item: NewsListItem;
    onDelete?: (id: string) => void;
}

const NewsItem: React.FC<Props> = ({ item, onDelete }) => {
    const imgSrc = item.image ? item.image : '/placeholder.png';

    return (
        <div className="news-item">
            <img src={imgSrc} alt={item.title} className="news-item-img" />
            <div className="news-item-body">
                <h3>{item.title}</h3>
                <p className="news-item-date">{new Date(item.createdAt).toLocaleString()}</p>
                <div className="news-item-actions">
                    <Link to={`/news/${item.id}`} className="link">Read Full Post &gt;&gt;</Link>
                    <button className="link danger" onClick={() => onDelete && onDelete(item.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
