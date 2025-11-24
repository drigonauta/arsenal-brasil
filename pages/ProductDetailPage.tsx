import React, { useState } from 'react';
import { products } from '../data/products';
import { stores } from '../data/stores';
import { ShieldCheckIcon } from '../assets/icons';
import { Page } from '../types';
import ComplianceAnalyzer from '../components/ComplianceAnalyzer';

interface ProductDetailPageProps {
    productId: number;
    onNavigate: (page: Page, id?: number) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onNavigate }) => {
    const product = products.find(p => p.id === productId);
    const store = product ? stores.find(s => s.id === product.storeId) : null;
    const [selectedImage, setSelectedImage] = useState(product?.imageUrls[0]);

    if (!product) {
        return (
            <div className="bg-gray-900 py-20 text-center min-h-[calc(100vh-250px)] flex flex-col items-center justify-center">
                <h2 className="text-2xl text-white font-bold">Produto não encontrado.</h2>
                <button onClick={() => onNavigate('marketplace')} className="mt-6 bg-arsenal-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
                    Voltar ao Marketplace
                </button>
            </div>
        );
    }

    if (!selectedImage) {
        setSelectedImage(product.imageUrls[0]);
    }

    return (
        <div className="bg-gray-900 py-12 md:py-20 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <button onClick={() => onNavigate('marketplace')} className="text-gray-400 hover:text-white font-medium transition-colors flex items-center gap-2 group">
                        <div className="p-2 rounded-full bg-gray-800 group-hover:bg-arsenal-red transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                        Voltar ao Marketplace
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                    {/* Gallery Section */}
                    <div className="space-y-4">
                        <div className="bg-gray-800/50 rounded-3xl border border-gray-700 p-6 flex items-center justify-center h-[500px] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <img src={selectedImage} alt={product.name} className="max-h-full w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.imageUrls.map((url, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(url)}
                                    className={`bg-gray-800/50 rounded-xl flex items-center justify-center h-24 overflow-hidden border-2 transition-all duration-300 ${selectedImage === url ? 'border-arsenal-red shadow-lg shadow-red-900/20 scale-105' : 'border-transparent hover:border-gray-600'}`}
                                >
                                    <img src={url} alt={`${product.name} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-arsenal-red text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg shadow-red-900/20">{product.category}</span>
                            {product.isPremium && <span className="bg-amber-500 text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">Premium</span>}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">{product.name}</h1>
                        <div className="flex items-center gap-4 text-gray-400 mb-8 text-lg">
                            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-arsenal-red"></span>Calibre: {product.caliber}</span>
                            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-600"></span>Novo</span>
                        </div>

                        <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 mb-8">
                            <h3 className="text-lg font-bold text-white mb-3">Descrição</h3>
                            <p className="text-gray-300 leading-relaxed">{product.description}</p>
                        </div>

                        {store && (
                            <div className="bg-gray-800 rounded-2xl p-5 mb-8 flex items-center justify-between border border-gray-700 hover:border-gray-600 transition-colors group cursor-pointer" onClick={() => onNavigate('store', store.id)}>
                                <div className="flex items-center gap-4">
                                    <img src={store.logoUrl} alt={store.name} className="h-14 w-14 rounded-full object-contain bg-white p-1 shadow-lg" />
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Vendido por</p>
                                        <h4 className="font-bold text-white text-lg group-hover:text-arsenal-red transition-colors">{store.name}</h4>
                                    </div>
                                </div>
                                <button className="bg-gray-700 group-hover:bg-gray-600 text-white text-sm font-bold py-2.5 px-5 rounded-xl transition-colors">
                                    Ver Loja
                                </button>
                            </div>
                        )}

                        <ComplianceAnalyzer product={product} />

                        <div className="mt-8 p-6 bg-gray-800/50 rounded-3xl border border-gray-700/50 backdrop-blur-sm sticky bottom-4 z-10 shadow-2xl">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Valor total</p>
                                    <span className="text-4xl font-black text-white tracking-tight">{product.price}</span>
                                </div>
                                <button className="w-full sm:w-auto bg-arsenal-red hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:-translate-y-1 flex items-center justify-center gap-3">
                                    <ShieldCheckIcon className="h-6 w-6" />
                                    Tenho Interesse
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
