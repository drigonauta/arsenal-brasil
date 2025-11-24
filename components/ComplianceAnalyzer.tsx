
import React, { useState } from 'react';
import { Product } from '../types';
import { useComplianceAnalyzer } from '../hooks/useComplianceAnalyzer';
import { CloseIcon } from '../assets/icons';

interface ComplianceAnalyzerProps {
    product: Product;
}

const ComplianceAnalyzer: React.FC<ComplianceAnalyzerProps> = ({ product }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const { analysis, isLoading, error, analyzeProduct } = useComplianceAnalyzer();

    const handleAnalyzeClick = () => {
        analyzeProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    // A simple markdown-to-HTML renderer
    const renderMarkdown = (text: string) => {
        const html = text
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-white mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-white mb-3">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mb-4">$1</h1>')
            .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
            .replace(/^- (.*$)/gim, '<li class="flex items-start mb-2"><span class="text-green-500 mr-2 mt-1">&#10003;</span><span>$1</span></li>')
            .replace(/PARECER DE CONFORMIDADE: \[Positivo\]/g, '<strong class="text-green-400">PARECER DE CONFORMIDADE: Positivo</strong>')
            .replace(/PARECER DE CONFORMIDADE: \[Requer Atenção\]/g, '<strong class="text-yellow-400">PARECER DE CONFORMIDADE: Requer Atenção</strong>')
            .replace(/PARECER DE CONFORMIDADE: \[Negativo\]/g, '<strong class="text-red-400">PARECER DE CONFORMIDADE: Negativo</strong>')
            .replace(/OK/g, '<span class="text-green-400 font-semibold">OK</span>')
            .replace(/REVISÃO/g, '<span class="text-yellow-400 font-semibold">REVISÃO</span>');
        
        return <ul dangerouslySetInnerHTML={{ __html: html }} />;
    };

    return (
        <>
            <div className="bg-gray-800/50 border border-dashed border-gray-600 rounded-lg p-4 text-center">
                <h4 className="font-bold text-white">Vendedor: Verifique seu Anúncio</h4>
                <p className="text-sm text-gray-400 mt-1 mb-3">Use nossa IA para analisar a conformidade legal da sua descrição antes de publicar.</p>
                <button 
                    onClick={handleAnalyzeClick}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-5 rounded-lg transition-colors duration-300 text-sm"
                >
                    <span className="font-mono text-xs bg-black/20 px-1 py-0.5 rounded mr-2">AI</span>
                    Analisar Conformidade (Premium)
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl relative border border-red-800 max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Análise de Conformidade Legal (IA)</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                <CloseIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="overflow-y-auto pr-2">
                            {isLoading && (
                                <div className="text-center p-8">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                                    <p className="mt-4 text-gray-300">Analisando documento... Por favor, aguarde.</p>
                                </div>
                            )}
                            {error && <p className="text-red-400 text-center">{error}</p>}
                            {analysis && (
                                <div className="bg-gray-900/50 p-4 rounded-md prose prose-invert">
                                    {renderMarkdown(analysis)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ComplianceAnalyzer;
