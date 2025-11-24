
import React from 'react';
import { Page } from '../types';
import { StorefrontIcon, CubeIcon, ShieldExclamationIcon, BulletIcon, TargetIcon } from '../assets/icons';

interface MarketplaceCategoriesProps {
    onNavigate: (page: Page) => void;
}

const MarketplaceCategories: React.FC<MarketplaceCategoriesProps> = ({ onNavigate }) => {
    const categories = [
        {
            icon: <StorefrontIcon className="h-12 w-12 text-red-500" />,
            title: "Armas de Fogo",
            description: "Pistolas, revólveres, rifles e espingardas de vendedores verificados.",
            page: 'marketplace' as Page,
        },
        {
            icon: <CubeIcon className="h-12 w-12 text-red-500" />,
            title: "Acessórios",
            description: "Miras, coldres, lanternas, grips e tudo para customizar seu equipamento.",
            page: 'marketplace' as Page,
        },
        {
            icon: <ShieldExclamationIcon className="h-12 w-12 text-red-500" />,
            title: "Equip. Táticos",
            description: "Coletes, cintos, mochilas e vestuário para operadores e entusiastas.",
            page: 'marketplace' as Page,
        },
        {
            icon: <BulletIcon className="h-12 w-12 text-red-500" />,
            title: "Munições",
            description: "Ampla variedade de calibres para treino e defesa, seguindo a legislação.",
            page: 'marketplace' as Page,
        },
        {
            icon: <TargetIcon className="h-12 w-12 text-red-500" />,
            title: "Airsoft",
            description: "Equipamentos, armas e acessórios para a prática do esporte.",
            page: 'marketplace' as Page,
        },
        {
            icon: <BulletIcon className="h-12 w-12 text-red-500" />, // Reusing BulletIcon for now, or could use another if available
            title: "Armas de Pressão",
            description: "Carabinas e pistolas de pressão (chumbinho) para esporte e lazer.",
            page: 'marketplace' as Page,
        }
    ];

    return (
        <section className="bg-gray-900 py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Explore Nossos Marketplaces</h2>
                    <p className="mt-2 text-gray-400">Encontre tudo o que você precisa em um só lugar.</p>
                    <div className="mt-4 w-24 h-1 bg-red-600 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {categories.map((category) => (
                        <div
                            key={category.title}
                            onClick={() => onNavigate(category.page)}
                            className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-red-600 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
                        >
                            <div className="flex-shrink-0 mb-4">
                                {category.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{category.title}</h3>
                            <p className="text-gray-400 text-sm flex-grow">{category.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarketplaceCategories;
