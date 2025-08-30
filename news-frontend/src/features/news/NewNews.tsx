import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import FileInput from '../../components/UI/FileInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createNews } from './newsSlice';

interface FormState {
    title: string;
    content: string;
    image: File | null;
}

const NewNews: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { creating, error } = useAppSelector(state => state.news);
    const [state, setState] = useState<FormState>({ title: '', content: '', image: null });

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setState(prev => ({ ...prev, [name]: value }));
    };

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setState(prev => ({ ...prev, image: files[0] }));
        } else {
            setState(prev => ({ ...prev, image: null }));
        }
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!state.title.trim()) {
            alert('Title is required');
            return;
        }

        if (!state.content.trim()) {
            alert('Content is required');
            return;
        }

        const formData = new FormData();
        formData.append('title', state.title.trim());
        formData.append('content', state.content.trim());
        if (state.image) {
            formData.append('image', state.image);
        }

        const result = await dispatch(createNews(formData));
        if (createNews.fulfilled.match(result)) {
            navigate('/');
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <form className="form" onSubmit={submitHandler}>
            <h2>Create news</h2>
            <label>
                Title
                <input name="title" value={state.title} onChange={inputChangeHandler} required />
            </label>

            <label>
                Content
                <textarea name="content" value={state.content} onChange={inputChangeHandler} required />
            </label>

            <label>
                Image
                <FileInput name="image" label="Choose image..." onChange={fileChangeHandler} />
            </label>

            <div className="form-actions">
                <button 
                    type="submit" 
                    disabled={creating || !state.title.trim() || !state.content.trim()} 
                    className="btn"
                >
                    {creating ? 'Creating...' : 'Create'}
                </button>
            </div>
        </form>
    );
};

export default NewNews;
