
import React, { useState, useMemo } from 'react';
import { faqItems, faqCategories } from '../data/faqData';
import { FaqItem as FaqItemType, FaqCategory } from '../types';
import { SearchIcon, BookOpenIcon, ChevronDownIcon } from '../assets/icons';

const FaqItem: React.FC<{ item: FaqItemType; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center p-5 text-left"
                aria-expanded={isOpen}
            >
                <span className="text-white font-semibold">{item.question}</span>
                <ChevronDownIcon className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="px-5 pb-5">
                    <p className="text-gray-300 whitespace-pre-line mb-4">{item.answer}</p>
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                            <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FaqPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [openId, setOpenId] = useState<number | null>(null);

    const categoriesWithCount: FaqCategory[] = useMemo(() => {
        const counts = faqItems.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return faqCategories.map(cat => ({ ...cat, count: counts[cat.id] || 0 }));
    }, []);

    const filteredFaqs = useMemo(() => {
        return faqItems.filter(item => {
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchesSearch = searchTerm.toLowerCase() === '' ||
                item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, activeCategory]);

    const groupedFaqs = useMemo(() => {
        return filteredFaqs.reduce((acc, item) => {
            (acc[item.category] = acc[item.category] || []).push(item);
            return acc;
        }, {} as Record<string, FaqItemType[]>);
    }, [filteredFaqs]);

    const handleToggle = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen py-12 md:py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/50 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-4">
                        <BookOpenIcon className="h-5 w-5" />
                        Central de Ajuda
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold">Perguntas Frequentes</h1>
                    <p className="mt-3 text-lg text-gray-400">Tudo sobre legislação de armas, munições e marketplace</p>
                </div>

                <div className="relative mb-8">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar dúvidas... (ex: 'quanto custa', 'CR vencido', 'munição')"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-2 ${activeCategory === 'all' ? 'bg-gray-700 text-white' : 'bg-transparent text-gray-400 hover:bg-gray-800'}`}
                    >
                        Todos
                    </button>
                    {categoriesWithCount.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-2 ${activeCategory === cat.id ? 'bg-gray-700 text-white' : 'bg-transparent text-gray-400 hover:bg-gray-800'}`}
                        >
                            <cat.icon className="h-4 w-4" />
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="space-y-8">
                    {Object.keys(groupedFaqs).length > 0 ? (
                        Object.entries(groupedFaqs).map(([categoryId, items]) => {
                            const categoryInfo = categoriesWithCount.find(c => c.id === categoryId);
                            if (!categoryInfo) return null;
                            return (
                                <div key={categoryId}>
                                    <div className="flex items-center gap-4 p-4 bg-gray-800/30 border border-gray-700 rounded-lg mb-4">
                                        <div className="bg-blue-600/20 p-3 rounded-lg">
                                            <categoryInfo.icon className="h-6 w-6 text-blue-300" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">{categoryInfo.name}</h2>
                                            <p className="text-sm text-gray-400">{items.length} perguntas</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {items.map(item => (
                                            <FaqItem key={item.id} item={item} isOpen={openId === item.id} onClick={() => handleToggle(item.id)} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-12 bg-gray-800/50 rounded-lg">
                            <p className="text-lg text-gray-400">Nenhum resultado encontrado para sua busca.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
