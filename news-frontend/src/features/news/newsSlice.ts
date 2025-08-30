import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { News, NewsListItem } from '../../types';
import axiosApi from '../../api/axiosApi';

interface NewsState {
    items: NewsListItem[];
    currentNews: News | null;
    loading: boolean;
    creating: boolean;
    deleting: boolean;
    error: string | null;
}

const initialState: NewsState = {
    items: [],
    currentNews: null,
    loading: false,
    creating: false,
    deleting: false,
    error: null,
};

export const fetchNews = createAsyncThunk<NewsListItem[]>(
    'news/fetchNews',
    async () => {
        const response = await axiosApi.get<NewsListItem[]>('/news');
        return response.data;
    }
);

export const fetchNewsById = createAsyncThunk<News, string>(
    'news/fetchNewsById',
    async (id: string) => {
        const response = await axiosApi.get<News>(`/news/${id}`);
        return response.data;
    }
);

export const createNews = createAsyncThunk<News, FormData>(
    'news/createNews',
    async (formData: FormData) => {
        const response = await axiosApi.post<News>('/news', formData);
        return response.data;
    }
);

export const deleteNews = createAsyncThunk<string, string>(
    'news/deleteNews',
    async (id: string) => {
        await axiosApi.delete(`/news/${id}`);
        return id;
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentNews: (state) => {
            state.currentNews = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchNews
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch news';
            })
            // fetchNewsById
            .addCase(fetchNewsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentNews = action.payload;
            })
            .addCase(fetchNewsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch news';
            })
            // createNews
            .addCase(createNews.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(createNews.fulfilled, (state, action) => {
                state.creating = false;
                const newItem: NewsListItem = {
                    id: action.payload.id,
                    title: action.payload.title,
                    image: action.payload.image,
                    createdAt: action.payload.createdAt,
                };
                state.items.unshift(newItem);
            })
            .addCase(createNews.rejected, (state, action) => {
                state.creating = false;
                state.error = action.error.message || 'Failed to create news';
            })
            // deleteNews
            .addCase(deleteNews.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.deleting = false;
                state.items = state.items.filter(item => item.id !== action.payload);
                if (state.currentNews?.id === action.payload) {
                    state.currentNews = null;
                }
            })
            .addCase(deleteNews.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.error.message || 'Failed to delete news';
            });
    },
});

export const { clearError, clearCurrentNews } = newsSlice.actions;
export default newsSlice.reducer;
