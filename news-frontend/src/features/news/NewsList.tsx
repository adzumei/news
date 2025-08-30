import React from 'react';
import { Link } from 'react-router-dom';
import NewsItem from '../../components/NewsItem';
import type { NewsListItem } from '../../types';

interface Props {
    items?: NewsListItem[];
    loading?: boolean;
    onDelete?: (id: string) => void;
}

const NewsList: React.FC<Props> = ({ items = [], loading = false, onDelete }) => {
    return (
        <div>
            <div className="page-header">
                <h1>News</h1>
                <Link to="/news/new" className="btn">Add new post</Link>
            </div>

            {loading ? <p>Loading...</p> : null}

            <div className="news-list">
                {items.length === 0 && !loading ? <p>No news yet.</p> : null}
                {items.map(item => (
                    <NewsItem key={item.id} item={item} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
};

export default NewsList;
