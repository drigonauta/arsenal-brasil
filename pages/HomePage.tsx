
import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import FeaturedProducts from '../components/FeaturedProducts';
import HowItWorks from '../components/HowItWorks';
import MarketplaceCategories from '../components/MarketplaceCategories';
import CollectorsSection from '../components/CollectorsSection';
import Billboard from '../components/Billboard';
import { Page } from '../types';

interface HomePageProps {
    onNavigate: (page: Page, id?: number) => void;
    onRegisterClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onRegisterClick }) => {
    return (
        <>
            <Billboard onNavigate={onNavigate} />
            <Hero onNavigate={onNavigate} />
            <Stats />
            <CollectorsSection />
            <MarketplaceCategories onNavigate={onNavigate} />
            <FeaturedProducts onNavigate={onNavigate} />
            <HowItWorks />
        </>
    );
};

export default HomePage;
