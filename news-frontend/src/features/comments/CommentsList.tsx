import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteComment } from './commentsSlice';

interface CommentsListProps {
    newsId: string;
}

const CommentsList: React.FC<CommentsListProps> = () => {
    const dispatch = useAppDispatch();
    const { items, loading, deleting, error } = useAppSelector(state => state.comments);

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            dispatch(deleteComment(id));
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (loading) {
        return <p>Loading comments...</p>;
    }

    return (
        <div className="comments-list">
            <h3>Comments ({items.length})</h3>
            {items.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                items.map(comment => (
                    <div key={comment.id} className="comment-item">
                        <div className="comment-header">
                            <strong>{comment.author}</strong>
                            <button
                                className="link danger small"
                                onClick={() => handleDelete(comment.id)}
                                disabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentsList;
