import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsItem from '../../components/NewsItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchNews, deleteNews } from './newsSlice';

const NewsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector(state => state.news);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this news?')) {
            await dispatch(deleteNews(id));
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

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
                    <NewsItem key={item.id} item={item} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default NewsList;
