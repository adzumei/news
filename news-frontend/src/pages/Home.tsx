import React from 'react';
import NewsList from '../features/news/NewsList';

const Home: React.FC = () => {
    return (
        <main className="container">
            <NewsList />
        </main>
    );
};

export default Home;
