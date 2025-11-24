import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page } from '../types';

interface BillboardProps {
    onNavigate: (page: Page, id?: number) => void;
}

const slides = [
    {
        id: 1,
        title: "Área do Colecionador",
        description: "Itens raros e exclusivos para quem exige o melhor. Negocie relíquias históricas.",
        image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=2000",
        action: "Explorar Coleção",
        target: "scroll-collectors",
        color: "from-amber-600 to-yellow-600"
    },
    {
        id: 2,
        title: "Assessoria Completa CAC",
        description: "Obtenha seu CR com segurança e agilidade. Planos a partir de R$ 899,00.",
        image: "https://images.unsplash.com/photo-1585562104169-7f5d18f3d178?auto=format&fit=crop&q=80&w=2000",
        action: "Ver Planos",
        target: "cac-services",
        color: "from-red-600 to-red-800"
    },
    {
        id: 3,
        title: "Maior Marketplace do Brasil",
        description: "Compre e venda armas de fogo com segurança jurídica total e verificação rigorosa.",
        image: "https://images.unsplash.com/photo-1584039257564-44c747d21f82?auto=format&fit=crop&q=80&w=2000",
        action: "Acessar Marketplace",
        target: "marketplace",
        color: "from-blue-600 to-blue-800"
    }
];

const Billboard: React.FC<BillboardProps> = ({ onNavigate }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const handleClick = (target: string) => {
        if (target === 'scroll-collectors') {
            const element = document.getElementById('collectors-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            onNavigate(target as Page);
        }
    };

    return (
        <div
            className="relative w-full h-[450px] md:h-[550px] overflow-hidden bg-gray-900 mb-0 group cursor-pointer shadow-2xl border-b border-white/10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                    onClick={() => handleClick(slides[currentIndex].target)}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
                    />

                    {/* Dynamic Overlay - Uses slide color for tint */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentIndex].color} opacity-90 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center container mx-auto px-6">
                        <div className="max-w-3xl relative z-10">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-3 mb-6"
                            >
                                <span className="h-1 w-12 bg-white rounded-full"></span>
                                <span className="text-white/90 font-bold tracking-[0.2em] text-sm uppercase">
                                    Destaque da Semana
                                </span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg"
                            >
                                {slides[currentIndex].title}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl md:text-2xl text-white/90 mb-10 max-w-xl font-light leading-relaxed drop-shadow-md"
                            >
                                {slides[currentIndex].description}
                            </motion.p>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="group relative px-8 py-4 bg-white text-gray-900 font-bold rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider text-sm">
                                    {slides[currentIndex].action}
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            <div className="absolute bottom-10 right-10 flex gap-4 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(index);
                        }}
                        className={`transition-all duration-500 rounded-full ${index === currentIndex
                            ? 'w-12 h-3 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                            : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Billboard;
