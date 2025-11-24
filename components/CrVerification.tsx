
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { useCrVerifier } from '../hooks/useCrVerifier';
import { DocumentTextIcon, SparklesIcon, ArrowUpOnSquareIcon, ShieldCheckIcon } from '../assets/icons';

interface CrVerificationProps {
    user: UserProfile;
    onStatusChange: (newStatus: UserProfile['crStatus']) => void;
}

const CrVerification: React.FC<CrVerificationProps> = ({ user, onStatusChange }) => {
    const [crNumber, setCrNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const { verificationResult, isLoading, error, verifyCr } = useCrVerifier();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!crNumber || !expiryDate || !file) {
            alert('Por favor, preencha todos os campos e anexe o documento.');
            return;
        }
        onStatusChange('Em Análise');
        const result = await verifyCr(crNumber, expiryDate, file);
        if (result) {
            onStatusChange(result.status as UserProfile['crStatus']);
        } else {
            onStatusChange('Rejeitado');
        }
    };

    const getStatusBadge = () => {
        const baseClasses = "text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1";
        switch (user.crStatus) {
            case 'Verificado':
                return <span className={`${baseClasses} bg-green-500/20 text-green-300`}><ShieldCheckIcon className="h-4 w-4" /> Verificado</span>;
            case 'Em Análise':
                return <span className={`${baseClasses} bg-yellow-500/20 text-yellow-300`}>Em Análise</span>;
            case 'Rejeitado':
                return <span className={`${baseClasses} bg-red-500/20 text-red-300`}>Rejeitado</span>;
            case 'Não Enviado':
            default:
                return <span className={`${baseClasses} bg-gray-500/20 text-gray-400`}>Não Enviado</span>;
        }
    };

    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mt-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <DocumentTextIcon className="h-6 w-6" />
                    Certificado de Registro (CR)
                </h3>
                {getStatusBadge()}
            </div>

            {user.crStatus !== 'Verificado' && (
                <div className="bg-blue-600/20 border border-blue-500/50 rounded-lg p-4 flex items-center gap-3 mb-6">
                    <SparklesIcon className="h-6 w-6 text-blue-300 flex-shrink-0" />
                    <p className="text-sm text-blue-200">Envie seu CR para obter o selo de <strong>Vendedor Verificado</strong> e aumentar a confiança dos compradores.</p>
                </div>
            )}

            {user.crStatus === 'Verificado' && (
                <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3 mb-6">
                    <ShieldCheckIcon className="h-6 w-6 text-green-300 flex-shrink-0" />
                    <p className="text-sm text-green-200">Seu Certificado de Registro foi verificado. Você agora possui o selo de Vendedor Verificado em seus anúncios.</p>
                </div>
            )}

            {user.crStatus !== 'Verificado' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="crNumber" className="block text-sm font-medium text-gray-300 mb-1">Número do CR</label>
                            <input type="text" id="crNumber" value={crNumber} onChange={e => setCrNumber(e.target.value)} required placeholder="Ex: 123456789" className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                        <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300 mb-1">Data de Validade</label>
                            <input type="date" id="expiryDate" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} required className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="crDocument" className="block text-sm font-medium text-gray-300 mb-1">Documento do CR (PDF ou Imagem)</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10">
                            <div className="text-center">
                                <ArrowUpOnSquareIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-red-400">
                                        <span>Clique para fazer upload</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
                                    </label>
                                    <p className="pl-1">ou arraste e solte</p>
                                </div>
                                {file ? (
                                    <p className="text-sm text-green-400 mt-2">{file.name}</p>
                                ) : (
                                    <p className="text-xs leading-5 text-gray-500">PDF ou Imagem, máximo 10MB</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                    {verificationResult && verificationResult.status === 'Rejeitado' && <p className="text-sm text-yellow-400 text-center">Motivo da Rejeição (IA): {verificationResult.reason}</p>}
                    <div className="pt-2">
                        <button type="submit" className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-wait" disabled={isLoading}>
                            {isLoading ? 'Verificando com IA...' : 'Enviar para Verificação'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CrVerification;
