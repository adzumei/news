import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

const container = document.getElementById('root')!;
createRoot(container).render(
    <Provider store={store}>
        <App />
    </Provider>
);
