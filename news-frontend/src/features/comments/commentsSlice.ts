import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { CommentItem } from '../../types';
import axiosApi from '../../api/axiosApi';

interface CommentsState {
    items: CommentItem[];
    loading: boolean;
    creating: boolean;
    deleting: boolean;
    error: string | null;
}

const initialState: CommentsState = {
    items: [],
    loading: false,
    creating: false,
    deleting: false,
    error: null,
};

export const fetchComments = createAsyncThunk<CommentItem[], string | undefined>(
    'comments/fetchComments',
    async (newsId?: string) => {
        const url = newsId ? `/comments?news_id=${newsId}` : '/comments';
        const response = await axiosApi.get<CommentItem[]>(url);
        return response.data;
    }
);

export const createComment = createAsyncThunk<CommentItem, { newsId: string; author?: string; text: string }>(
    'comments/createComment',
    async ({ newsId, author, text }) => {
        const response = await axiosApi.post<CommentItem>('/comments', {
            newsId,
            author,
            text,
        });
        return response.data;
    }
);

export const deleteComment = createAsyncThunk<string, string>(
    'comments/deleteComment',
    async (id: string) => {
        await axiosApi.delete(`/comments/${id}`);
        return id;
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearComments: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch comments';
            })
            .addCase(createComment.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.creating = false;
                state.items.push(action.payload);
            })
            .addCase(createComment.rejected, (state, action) => {
                state.creating = false;
                state.error = action.error.message || 'Failed to create comment';
            })
            .addCase(deleteComment.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.deleting = false;
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.error.message || 'Failed to delete comment';
            });
    },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
