import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LegalAssistant from './components/LegalAssistant';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CacServicesPage from './pages/CacServicesPage';
import LegalSupportPage from './pages/LegalSupportPage';
import RegisterPage from './pages/RegisterPage';
import AdminPanelPage from './pages/AdminPanelPage';
import RegistrationModal from './components/RegistrationModal';
import FaqPage from './pages/FaqPage';
import SupportPage from './pages/SupportPage';
import ProfilePage from './pages/ProfilePage';
import StorePage from './pages/StorePage';
import { ChatProvider } from './context/ChatContext';
import { Page } from './types';
import { useUserActivity } from './hooks/useUserActivity';

interface ViewState {
    page: Page;
    productId?: number;
    storeId?: number;
}

export default function App() {
    const [view, setView] = useState<ViewState>({ page: 'home' });
    const { activity, trackNavigation } = useUserActivity('home');
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

    const handleNavigate = (page: Page, id?: number) => {
        const newView: ViewState = { page };
        if (page === 'product') {
            newView.productId = id;
        } else if (page === 'store') {
            newView.storeId = id;
        }
        setView(newView);
        trackNavigation(page, id);
        window.scrollTo(0, 0);
    };

    const renderPage = () => {
        switch (view.page) {
            case 'marketplace':
                return <MarketplacePage onNavigate={handleNavigate} />;
            case 'product':
                if (view.productId) {
                    return <ProductDetailPage productId={view.productId} onNavigate={handleNavigate} />;
                }
                return <MarketplacePage onNavigate={handleNavigate} />;
            case 'store':
                if (view.storeId) {
                    return <StorePage storeId={view.storeId} onNavigate={handleNavigate} />;
                }
                return <MarketplacePage onNavigate={handleNavigate} />;
            case 'cac-services':
                return <CacServicesPage />;
            case 'legal-support':
                return <LegalSupportPage />;
            case 'faq':
                return <FaqPage />;
            case 'support':
                return <SupportPage />;
            case 'profile':
                return <ProfilePage />;
            case 'register':
                return <RegisterPage onNavigate={handleNavigate} />;
            case 'admin':
                return <AdminPanelPage onNavigate={handleNavigate} />;
            case 'home':
            default:
                return <HomePage onNavigate={handleNavigate} onRegisterClick={() => handleNavigate('register')} />;
        }
    };

    return (
        <ChatProvider activity={activity}>
            <div className="bg-gray-900 text-white min-h-screen flex flex-col">
                <Header onNavigate={handleNavigate} onRegisterClick={() => setRegisterModalOpen(true)} />
                <main className="flex-grow">
                    {renderPage()}
                </main>
                <Footer onNavigate={handleNavigate} />
                <LegalAssistant />
                <RegistrationModal isOpen={isRegisterModalOpen} onClose={() => setRegisterModalOpen(false)} />
            </div>
        </ChatProvider>
    );
}
