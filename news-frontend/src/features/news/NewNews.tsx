import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import FileInput from '../../components/UI/FileInput';

interface FormState {
    title: string;
    content: string;
    image: File | null;
}

interface Props {
    onSubmit?: (form: FormState) => void;
    creating?: boolean;
}

const NewNews: React.FC<Props> = ({ onSubmit, creating = false }) => {
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

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(state);
        } else {
            console.log('Submit (not implemented yet):', state);
        }
    };

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
                <button type="submit" disabled={creating} className="btn">{creating ? 'Creating...' : 'Create'}</button>
            </div>
        </form>
    );
};

export default NewNews;
