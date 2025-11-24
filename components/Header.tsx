
import React from 'react';
import { Page } from '../types';
import { HomeIcon, MarketplaceIcon, CertificateIcon, FaqIcon, SupportIcon, BellIcon, UserIcon, LogoutIcon, ShieldCheckIcon } from '../assets/icons';

interface HeaderProps {
    onNavigate: (page: Page) => void;
    onRegisterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const navLinks = [
        { name: "Home", page: "home" as Page, icon: <HomeIcon className="h-5 w-5" /> },
        { name: "Marketplace", page: "marketplace" as Page, icon: <MarketplaceIcon className="h-5 w-5" /> },
        { name: "Serviços CAC", page: "cac-services" as Page, icon: <CertificateIcon className="h-5 w-5" /> },
        { name: "FAQ", page: "faq" as Page, icon: <FaqIcon className="h-5 w-5" /> },
        { name: "Suporte", page: "support" as Page, icon: <SupportIcon className="h-5 w-5" /> },
        { name: "Admin", page: "admin" as Page, icon: <ShieldCheckIcon className="h-5 w-5" /> }
    ];

    return (
        <header className="glass-dark sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
                        <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691da8a2dc22e654ae6f04bf/c50772d40_logoarsenal.png" alt="Arsenal Brasil Logo" className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
                        <div>
                            <div className="text-2xl font-black text-white tracking-wider font-sans">ARSENAL <span className="text-arsenal-red">BRASIL</span></div>
                            <div className="text-xs text-gray-400 tracking-widest uppercase">Marketplace de Armas</div>
                        </div>
                    </div>

                    {/* Center Navigation */}
                    <nav className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
                        {navLinks.map(link => (
                            <button
                                key={link.name}
                                onClick={() => onNavigate(link.page)}
                                className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-transparent hover:border-white/10"
                            >
                                {link.icon}
                                {link.name}
                            </button>
                        ))}
                    </nav>

                    {/* User Section */}
                    <div className="flex items-center gap-4">
                        <button className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                            <BellIcon className="h-6 w-6" />
                        </button>
                        <button onClick={() => onNavigate('profile')} className="flex items-center gap-3 cursor-pointer group pl-2 pr-4 py-1.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-arsenal-red to-red-900 flex items-center justify-center text-white font-bold shadow-lg">
                                <UserIcon className="h-5 w-5" />
                            </div>
                            <span className="hidden lg:block text-sm font-medium text-white group-hover:text-arsenal-red transition-colors">Rodrigo Ribeiro</span>
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                            <LogoutIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
