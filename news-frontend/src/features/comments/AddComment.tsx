import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createComment } from './commentsSlice';

interface AddCommentProps {
    newsId: string;
}

const AddComment: React.FC<AddCommentProps> = ({ newsId }) => {
    const dispatch = useAppDispatch();
    const { creating, error } = useAppSelector(state => state.comments);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!text.trim()) {
            alert('Comment text is required');
            return;
        }

        const result = await dispatch(createComment({
            newsId,
            author: author.trim() || undefined,
            text: text.trim(),
        }));

        if (createComment.fulfilled.match(result)) {
            setAuthor('');
            setText('');
        }
    };

    return (
        <div className="add-comment">
            <h3>Add Comment</h3>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="author">Author (optional):</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Anonymous"
                        disabled={creating}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="text">Comment:</label>
                    <textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write your comment..."
                        required
                        disabled={creating}
                        rows={3}
                    />
                </div>
                
                <button
                    type="submit"
                    className="btn"
                    disabled={creating || !text.trim()}
                >
                    {creating ? 'Adding...' : 'Add Comment'}
                </button>
            </form>
        </div>
    );
};

export default AddComment;
