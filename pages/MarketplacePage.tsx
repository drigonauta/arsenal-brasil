
import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import { Product, Page } from '../types';

interface MarketplacePageProps {
    onNavigate: (page: Page, id?: number) => void;
}

const ProductCard: React.FC<{ product: Product; onNavigate: (page: Page, id?: number) => void; }> = ({ product, onNavigate }) => (
    <div
        onClick={() => onNavigate('product', product.id)}
        className="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-arsenal-red transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20 hover:-translate-y-2 cursor-pointer flex flex-col"
    >
        <div className="relative h-56 overflow-hidden bg-gray-900">
            <img src={product.imageUrls[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
            <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                {product.isPremium && (
                    <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider shadow-lg">PREMIUM</span>
                )}
                {product.storeVerified && (
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        VERIFICADO
                    </span>
                )}
                {product.isCollectorItem && (
                    <span className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider shadow-lg flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        COLECIONADOR
                    </span>
                )}
                <span className="bg-arsenal-red text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg">{product.category}</span>
            </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-white group-hover:text-arsenal-red transition-colors line-clamp-2">{product.name}</h3>
            <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                Calibre: {product.caliber}
            </p>
            <div className="mt-auto pt-6 flex justify-between items-end border-t border-gray-700/50 mt-4">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Valor à vista</p>
                    <span className="text-2xl font-black text-white">{product.price}</span>
                </div>
                <button className="bg-gray-700 group-hover:bg-arsenal-red text-white p-2 rounded-lg transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
);

const MarketplacePage: React.FC<MarketplacePageProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<'firearms' | 'collectors' | 'tactical'>('firearms');
    const [subFilter, setSubFilter] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest'>('newest');

    const filterGroups = {
        firearms: ['Pistola', 'Rifle', 'Revólver', 'Espingarda'],
        tactical: ['Munição', 'Airsoft', 'Acessórios', 'Armas de Pressão']
    };

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // 1. Filter by Main Tab (Category Group)
        if (activeTab === 'collectors') {
            result = result.filter(p => p.isCollectorItem === true);
        } else if (activeTab === 'firearms') {
            result = result.filter(p => filterGroups.firearms.includes(p.category));
        } else if (activeTab === 'tactical') {
            result = result.filter(p => filterGroups.tactical.includes(p.category));
        }

        // 2. Filter by Sub-Category (Quick Filter)
        if (subFilter !== 'Todos') {
            result = result.filter(p => p.category === subFilter);
        }

        // 3. Filter by Search Term
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(lowerTerm) ||
                p.description.toLowerCase().includes(lowerTerm) ||
                p.caliber.toLowerCase().includes(lowerTerm)
            );
        }

        // 4. Sort
        result.sort((a, b) => {
            if (a.isPremium !== b.isPremium) return a.isPremium ? -1 : 1;
            if (sortBy === 'price-asc') {
                return parseFloat(a.price.replace('R$ ', '').replace('.', '').replace(',', '.')) - parseFloat(b.price.replace('R$ ', '').replace('.', '').replace(',', '.'));
            } else if (sortBy === 'price-desc') {
                return parseFloat(b.price.replace('R$ ', '').replace('.', '').replace(',', '.')) - parseFloat(a.price.replace('R$ ', '').replace('.', '').replace(',', '.'));
            }
            return 0;
        });

        return result;
    }, [activeTab, subFilter, searchTerm, sortBy]);

    return (
        <div className="bg-gray-900 py-12 md:py-20 min-h-[calc(100vh-250px)]">
            <div className="container mx-auto px-6">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">MARKETPLACE</h1>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Encontre o equipamento ideal para você com segurança e procedência garantida.</p>
                    <div className="mt-6 w-24 h-1 bg-arsenal-red mx-auto rounded-full"></div>
                </div>

                {/* Main Category Tabs */}
                <div className="flex justify-center mb-10">
                    <div className="bg-gray-800/50 p-1.5 rounded-2xl inline-flex border border-gray-700 backdrop-blur-sm">
                        <button
                            onClick={() => { setActiveTab('firearms'); setSubFilter('Todos'); }}
                            className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${activeTab === 'firearms'
                                ? 'bg-arsenal-red text-white shadow-lg shadow-red-900/50'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Armas de Fogo
                        </button>
                        <button
                            onClick={() => { setActiveTab('collectors'); setSubFilter('Todos'); }}
                            className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${activeTab === 'collectors'
                                ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-lg shadow-amber-900/50'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Colecionadores
                        </button>
                        <button
                            onClick={() => { setActiveTab('tactical'); setSubFilter('Todos'); }}
                            className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${activeTab === 'tactical'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Tático & Esportivo
                        </button>
                    </div>
                </div>

                {/* Controls Section (Search & Sub-filters) */}
                <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Buscar por nome, calibre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl py-3 px-4 pl-12 focus:outline-none focus:border-arsenal-red focus:ring-1 focus:ring-arsenal-red transition-all"
                        />
                        <svg className="w-5 h-5 text-gray-500 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Sub Filters (Only show for Firearms and Tactical) */}
                    {activeTab !== 'collectors' && (
                        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar w-full md:w-auto">
                            <button
                                onClick={() => setSubFilter('Todos')}
                                className={`whitespace-nowrap px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${subFilter === 'Todos'
                                    ? 'bg-gray-700 text-white ring-2 ring-gray-600'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                Todos
                            </button>
                            {(activeTab === 'firearms' ? filterGroups.firearms : filterGroups.tactical).map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSubFilter(category)}
                                    className={`whitespace-nowrap px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${subFilter === category
                                        ? 'bg-arsenal-red text-white shadow-lg shadow-red-900/50'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-gray-900 border border-gray-700 text-white text-sm rounded-xl focus:ring-arsenal-red focus:border-arsenal-red block p-3"
                    >
                        <option value="newest">Mais Recentes</option>
                        <option value="price-asc">Menor Preço</option>
                        <option value="price-desc">Maior Preço</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-xl">Nenhum produto encontrado com os filtros atuais.</p>
                        <button onClick={() => { setActiveTab('firearms'); setSubFilter('Todos'); setSearchTerm(''); }} className="mt-4 text-arsenal-red hover:underline">Limpar filtros</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarketplacePage;
