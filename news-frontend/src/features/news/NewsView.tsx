import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchNewsById, deleteNews } from './newsSlice';
import { fetchComments, clearComments } from '../comments/commentsSlice';
import CommentsList from '../comments/CommentsList';
import AddComment from '../comments/AddComment';
import { getImageUrl } from '../../utils/imageUtils';

const NewsView: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { currentNews, loading, deleting, error } = useAppSelector(state => state.news);

    useEffect(() => {
        if (id) {
            dispatch(fetchNewsById(id));
            dispatch(fetchComments(id));
        }
        
        return () => {
            dispatch(clearComments());
        };
    }, [dispatch, id]);

    const handleDelete = async () => {
        if (id && window.confirm('Are you sure you want to delete this news?')) {
            const result = await dispatch(deleteNews(id));
            if (deleteNews.fulfilled.match(result)) {
                navigate('/');
            }
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (loading) return <p>Loading...</p>;
    if (!currentNews) return <p>News not found.</p>;

    const img = getImageUrl(currentNews.image);

    return (
        <div className="news-view">
            <div className="page-header">
                <h1>{currentNews.title}</h1>
                <div>
                    <Link to="/" className="link">Back</Link>
                    <button
                        className="link danger"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>

            <img src={img} alt={currentNews.title} className="news-view-img" />
            <p className="news-view-date">{new Date(currentNews.createdAt).toLocaleString()}</p>
            <div className="news-view-content">{currentNews.content}</div>
            
            <CommentsList newsId={currentNews.id} />
            <AddComment newsId={currentNews.id} />
        </div>
    );
};

export default NewsView;
