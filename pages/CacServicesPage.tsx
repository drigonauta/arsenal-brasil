
import React from 'react';
import { CertificateIcon } from '../assets/icons';

const CheckIcon = () => (
    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const pricingTiers = [
    {
        name: "Plano Básico",
        price: "R$ 899,00",
        description: "Filiação e Assessoria para quem está começando.",
        features: [
            "Tudo do plano anterior",
            "Filiação ao Clube de Tiro",
            "Checklist de Documentos",
            "Guia Passo a Passo Digital",
            "Acesso à Comunidade",
            "Suporte por Email",
        ],
        buttonText: "Começar Agora",
        isFeatured: false,
    },
    {
        name: "Plano Pro",
        price: "R$ 1.299",
        description: "Assessoria completa para a concessão do seu Certificado de Registro.",
        features: [
            "Tudo do plano Básico",
            "Concessão de CR",
            "Análise e Correção de Documentos",
            "Preenchimento de Formulários",
            "Agendamento nos Órgãos Competentes",
            "Suporte Prioritário via WhatsApp",
        ],
        buttonText: "Contratar Assessoria",
        isFeatured: true,
    },
    {
        name: "Plano Premium",
        price: "R$ 2.499",
        description: "Serviço VIP com acompanhamento total e acesso exclusivo.",
        features: [
            "Tudo do plano Pro",
            "Acesso ao Presidente do Clube CTC1911",
            "Acompanhamento Presencial (se disponível)",
            "Consultoria Jurídica Inicial",
            "Despachante Exclusivo",
        ],
        buttonText: "Solicitar Contato",
        isFeatured: false,
    },
];

const CacServicesPage: React.FC = () => {
    return (
        <div className="bg-gray-900 py-12 md:py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <CertificateIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Serviços para CAC</h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">Oferecemos assessoria completa para a obtenção e renovação do seu Certificado de Registro (CR) de Atirador, Caçador e Colecionador.</p>
                    <div className="mt-6 w-24 h-1 bg-red-600 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {pricingTiers.map((tier) => (
                        <div key={tier.name} className={`bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col border-2 ${tier.isFeatured ? 'border-red-600' : 'border-gray-700'}`}>
                            {tier.isFeatured && <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full self-center mb-4 -mt-12">MAIS POPULAR</span>}
                            <h3 className="text-2xl font-bold text-white text-center">{tier.name}</h3>
                            <p className="text-gray-400 text-center mt-2 h-12">{tier.description}</p>
                            <div className="text-center my-6">
                                <span className="text-5xl font-black text-white">{tier.price}</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <CheckIcon />
                                        <span className="ml-3 text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto">
                                <button className={`w-full font-bold py-3 px-6 rounded-lg transition-colors duration-300 ${tier.isFeatured ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}>
                                    {tier.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CacServicesPage;
