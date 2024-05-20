import React from 'react'
import Layout from '../components/Layout'
import TopBanner from '../components/TopBanner'
import TrendingSongList from '../components/TrendingSongList'

function HomePage() {
    return (
        <Layout>
            <TopBanner />
            <TrendingSongList />
        </Layout>
    )
}

export default HomePage