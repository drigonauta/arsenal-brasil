
import React from 'react';
import { Page } from '../types';
import { CartIcon } from '../assets/icons';

interface HeroProps {
    onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
    return (
        <div className="relative bg-gray-900 overflow-hidden">
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center transform scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563239999-395650314b35?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
            ></div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900"></div>

            <div className="relative container mx-auto px-6 text-center py-32 sm:py-40 lg:py-48">
                <div className="animate-fade-in inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 text-sm font-medium text-red-400 mb-8 shadow-lg">
                    🛡️ O Maior Marketplace de Armas do Brasil
                </div>

                <h1 className="animate-slide-up text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl">
                    ARSENAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-arsenal-red to-red-600">BRASIL</span>
                </h1>

                <p className="animate-slide-up delay-100 mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                    Compre e venda armas de fogo com <strong className="text-white font-semibold">segurança jurídica total</strong>.
                    Milhares de armas disponíveis, chat seguro e verificação rigorosa de vendedores.
                </p>

                <div className="animate-slide-up delay-200 mt-12 flex justify-center items-center gap-6 flex-wrap">
                    <button
                        onClick={() => onNavigate('marketplace')}
                        className="flex items-center gap-3 bg-arsenal-red hover:bg-red-700 text-white font-black py-5 px-12 rounded-xl text-xl transition-all duration-300 shadow-lg hover:shadow-red-900/50 hover:-translate-y-1 uppercase tracking-widest"
                    >
                        <CartIcon className="h-6 w-6" />
                        MARKETPLACE - ACESSE JÁ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
