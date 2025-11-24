
import React, { useState } from 'react';
import { CloseIcon } from '../assets/icons';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [isSeller, setIsSeller] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the registration logic,
        // e.g., send data to a backend API.
        console.log({ name, email, cpf, password, isSeller });
        alert('Cadastro realizado com sucesso! (Simulação)');
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative border border-red-800">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <CloseIcon className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Criar Conta</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>
                    <div>
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-300 mb-1">CPF</label>
                        <input type="text" id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} required placeholder="000.000.000-00" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>
                    <div className="flex items-center">
                        <input
                            id="is-seller"
                            name="is-seller"
                            type="checkbox"
                            checked={isSeller}
                            onChange={(e) => setIsSeller(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-red-600 focus:ring-red-600"
                        />
                        <label htmlFor="is-seller" className="ml-2 block text-sm text-gray-300">
                            Quero ser um vendedor
                        </label>
                    </div>
                    <div className="pt-4">
                        <button type="submit" className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationModal;
