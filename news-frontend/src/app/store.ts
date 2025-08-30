import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/news/newsSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer,
        comments: commentsReducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
