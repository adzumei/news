import React from 'react';
import type { News } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
    item?: News | null;
    loading?: boolean;
    onDelete?: (id: string) => void;
}

const NewsView: React.FC<Props> = ({ item, loading = false, onDelete }) => {
    if (loading) return <p>Loading...</p>;
    if (!item) return <p>News not found.</p>;

    const img = item.image ? item.image : '/placeholder.png';

    return (
        <div className="news-view">
            <div className="page-header">
                <h1>{item.title}</h1>
                <div>
                    <Link to="/" className="link">Back</Link>
                    <button className="link danger" onClick={() => onDelete && onDelete(item.id)}>Delete</button>
                </div>
            </div>

            <img src={img} alt={item.title} className="news-view-img" />
            <p className="news-view-date">{new Date(item.createdAt).toLocaleString()}</p>
            <div className="news-view-content">{item.content}</div>
        </div>
    );
};

export default NewsView;
