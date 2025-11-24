
import React from 'react';
import { stores } from '../data/stores';
import { products } from '../data/products';
import { Product } from '../types';
import { Page } from '../types';

interface StorePageProps {
    storeId: number;
    onNavigate: (page: Page, id?: number) => void;
}

const ProductCard: React.FC<{ product: Product; onNavigate: (page: Page, id?: number) => void; }> = ({ product, onNavigate }) => (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-red-900/40 hover:-translate-y-1 flex flex-col border-2 border-transparent hover:border-red-600">
        <div className="relative">
            <img src={product.imageUrls[0]} alt={product.name} className="w-full h-48 object-cover" />
            <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
                {product.isPremium && (
                    <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">PREMIUM</span>
                )}
                <span className="bg-red-700 text-white text-xs font-bold px-2 py-1 rounded">{product.category}</span>
            </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-white">{product.name}</h3>
            <p className="text-sm text-gray-400 mt-1">Calibre: {product.caliber}</p>
            <div className="mt-auto pt-4 flex justify-between items-center">
                <span className="text-xl font-black text-white">{product.price}</span>
                <button onClick={() => onNavigate('product', product.id)} className="text-red-500 hover:text-red-400 font-semibold transition-colors">
                    Ver Detalhes
                </button>
            </div>
        </div>
    </div>
);

const StorePage: React.FC<StorePageProps> = ({ storeId, onNavigate }) => {
    const store = stores.find(s => s.id === storeId);
    const storeProducts = products.filter(p => p.storeId === storeId);

    if (!store) {
        return (
            <div className="bg-gray-900 py-20 text-center min-h-[calc(100vh-250px)] flex flex-col items-center justify-center">
                <h2 className="text-2xl text-white">Loja não encontrada.</h2>
                <button onClick={() => onNavigate('marketplace')} className="mt-4 bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg">
                    Voltar ao Marketplace
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 py-12 md:py-16">
            <div className="container mx-auto px-6">
                {/* Store Header */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 mb-12">
                    <img src={store.logoUrl} alt={`${store.name} logo`} className="h-28 w-28 rounded-full object-contain bg-white p-2 border-4 border-gray-700" />
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-white">{store.name}</h1>
                        <p className="mt-2 text-gray-400 max-w-2xl">{store.description}</p>
                    </div>
                </div>

                {/* Products Grid */}
                <h2 className="text-2xl font-bold text-white mb-6">Produtos da Loja</h2>
                {storeProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {storeProducts.map(product => (
                            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg text-center py-20 px-6">
                        <h3 className="text-xl font-semibold text-white">Nenhum produto encontrado</h3>
                        <p className="text-gray-400 mt-2">Esta loja ainda não cadastrou produtos.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StorePage;
