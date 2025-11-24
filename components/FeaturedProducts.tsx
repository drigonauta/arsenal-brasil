
import React from 'react';
import { products } from '../data/products';
import { Page } from '../types';

interface FeaturedProductsProps {
    onNavigate: (page: Page, id?: number) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onNavigate }) => {
    const featured = products.slice(0, 4);

    return (
        <section className="bg-gray-800 py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Destaques do Marketplace</h2>
                    <p className="mt-2 text-gray-400">Confira alguns dos itens mais procurados em nossa plataforma.</p>
                    <div className="mt-4 w-24 h-1 bg-red-600 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featured.map((product) => (
                        <div key={product.id} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-red-900/40">
                            <div className="relative">
                                <img src={product.imageUrls[0]} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
                                    {product.isPremium && (
                                        <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">PREMIUM</span>
                                    )}
                                    <span className="bg-red-700 text-white text-xs font-bold px-2 py-1 rounded">{product.category}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                                <p className="text-sm text-gray-400 mt-1">Calibre: {product.caliber}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-xl font-black text-white">{product.price}</span>
                                    <button onClick={() => onNavigate('product', product.id)} className="text-red-500 hover:text-red-400 font-semibold transition-colors bg-transparent border-none">
                                        Ver Detalhes
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <button onClick={() => onNavigate('marketplace')} className="bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
                        Ver Todos os Produtos
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
