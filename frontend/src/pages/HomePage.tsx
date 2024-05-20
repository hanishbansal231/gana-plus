import React from 'react';
import Layout from '../components/Layout';
import TopBanner from '../components/TopBanner';
import SongList from '../components/SongList';
import ArtistList from '../components/ArtistList';

const HomePage: React.FC = () => {
    return (
        <Layout>
            <TopBanner />
            <SongList title="Trending Song" />
            <SongList title="Hindi Song" />
            <ArtistList />
            <SongList title="Punjabi Song" />
        </Layout>
    );
};

export default HomePage;
