
import React from 'react';
import { ScaleIcon } from '../assets/icons';

const CheckIcon = () => (
    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const supportTiers = [
    {
        name: "Consulta Inicial",
        price: "R$ 350",
        unit: "/ hora",
        description: "Esclareça dúvidas pontuais com um de nossos especialistas.",
        features: [
            "Sessão de 1 hora por vídeo",
            "Análise de caso específico",
            "Orientações sobre legislação",
            "Direcionamento de próximos passos",
        ],
        buttonText: "Agendar Consulta",
        isFeatured: false,
    },
    {
        name: "Processo de Aquisição",
        price: "R$ 1.500",
        unit: "",
        description: "Assessoria jurídica completa para a compra da sua primeira arma.",
        features: [
            "Análise de perfil e elegibilidade",
            "Acompanhamento do processo no SINARM/SIGMA",
            "Elaboração de defesas e recursos (1ª instância)",
            "Suporte contínuo até a emissão do CRAF",
        ],
        buttonText: "Iniciar Processo",
        isFeatured: true,
    },
    {
        name: "Defesa Administrativa",
        price: "Sob Consulta",
        unit: "",
        description: "Representação em processos administrativos e recursos.",
        features: [
            "Análise detalhada do auto de infração",
            "Elaboração de defesa técnica",
            "Acompanhamento em todas as instâncias",
            "Consultoria estratégica para o caso",
        ],
        buttonText: "Solicitar Orçamento",
        isFeatured: false,
    },
];

const LegalSupportPage: React.FC = () => {
    return (
        <div className="bg-gray-900 py-12 md:py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <ScaleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Apoio Jurídico Especializado</h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">Navegue pela burocracia com a segurança de ter um especialista ao seu lado. Oferecemos suporte em todas as etapas do processo legal.</p>
                    <div className="mt-6 w-24 h-1 bg-red-600 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {supportTiers.map((tier) => (
                        <div key={tier.name} className={`bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col border-2 ${tier.isFeatured ? 'border-red-600' : 'border-gray-700'}`}>
                            {tier.isFeatured && <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full self-center mb-4 -mt-12">RECOMENDADO</span>}
                            <h3 className="text-2xl font-bold text-white text-center">{tier.name}</h3>
                            <p className="text-gray-400 text-center mt-2 h-12">{tier.description}</p>
                            <div className="text-center my-6">
                                <span className="text-5xl font-black text-white">{tier.price}</span>
                                {tier.unit && <span className="text-gray-400">{tier.unit}</span>}
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

export default LegalSupportPage;
