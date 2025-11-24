
import React from 'react';
import { Page } from '../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-gray-800">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-white uppercase">Arsenal Brasil</h3>
                        <p className="mt-4 text-gray-400 text-sm">
                            Sua plataforma de confiança para o universo das armas de fogo.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold text-gray-200 uppercase tracking-wider">Links Rápidos</h3>
                        <ul className="mt-4 space-y-2">
                            <li><button onClick={() => onNavigate('marketplace')} className="text-gray-400 hover:text-red-500 transition-colors bg-transparent border-none text-left p-0">Marketplace</button></li>
                            <li><button onClick={() => onNavigate('cac-services')} className="text-gray-400 hover:text-red-500 transition-colors bg-transparent border-none text-left p-0">Serviços CAC</button></li>
                            <li><button onClick={() => onNavigate('legal-support')} className="text-gray-400 hover:text-red-500 transition-colors bg-transparent border-none text-left p-0">Apoio Jurídico</button></li>
                            <li><button onClick={() => onNavigate('faq')} className="text-gray-400 hover:text-red-500 transition-colors bg-transparent border-none text-left p-0">FAQ</button></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold text-gray-200 uppercase tracking-wider">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li><button className="text-gray-400 hover:text-red-500 transition-colors bg-transparent border-none text-left p-0">Termos de Serviço</button></li>
                            <li><button className="text-gray-400 hover:text-red-500 transition-colors bg-transparent border-none text-left p-0">Política de Privacidade</button></li>
                            <li><button className="text-gray-400 hover:text-red-500 transition-colors bg-transparent border-none text-left p-0">Aviso Legal</button></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold text-gray-200 uppercase tracking-wider">Aviso Importante</h3>
                        <p className="mt-4 text-gray-500 text-sm">
                            A comercialização de armas de fogo no Brasil é restrita e depende de autorização prévia do órgão competente. Atuamos em estrita conformidade com a legislação vigente.
                        </p>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {currentYear} ARSENAL BRASIL. Todos os direitos reservados.</p>
                    <p className="mt-1">Este é um projeto fictício para fins de demonstração.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
