
import React from 'react';

const steps = [
    {
        number: "01",
        title: "Cadastre-se e Verifique",
        description: "Crie sua conta e envie os documentos necessários para verificação de identidade e conformidade legal."
    },
    {
        number: "02",
        title: "Navegue e Escolha",
        description: "Explore nosso marketplace, filtre por categoria e encontre a arma de fogo ou acessório ideal para você."
    },
    {
        number: "03",
        title: "Compre com Segurança",
        description: "Realize a compra de forma segura. Uma pequena taxa de serviço é aplicada para cobrir a verificação e o suporte no processo de transferência."
    }
];

const HowItWorks: React.FC = () => {
    return (
        <section className="bg-gray-900 py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Como Funciona</h2>
                    <p className="mt-2 text-gray-400">Um processo simples, transparente e seguro em 3 passos.</p>
                    <div className="mt-4 w-24 h-1 bg-red-600 mx-auto"></div>
                </div>
                <div className="relative">
                    {/* Dashed line for desktop */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-600"></div>
                    
                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center z-10 bg-gray-900 px-2">
                                <div className="relative inline-block">
                                    <div className="w-24 h-24 flex items-center justify-center bg-gray-800 border-2 border-red-600 rounded-full text-3xl font-bold text-red-500 mb-4 shadow-lg">
                                        {step.number}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-gray-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
