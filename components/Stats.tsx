
import React from 'react';

const stats = [
    { name: 'Armas à venda', value: '1.500+' },
    { name: 'Vendedores verificados', value: '850+' },
    { name: 'Vendas realizadas', value: '2.300+' },
    { name: 'Satisfação', value: '98%' },
];

const Stats: React.FC = () => {
    return (
        <div className="bg-gray-900 border-y border-gray-800">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <div key={stat.name}>
                            <p className="text-4xl lg:text-5xl font-extrabold text-red-500">{stat.value}</p>
                            <p className="mt-1 text-sm lg:text-base text-gray-400 uppercase tracking-wider">{stat.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;
