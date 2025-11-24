import React, { useState } from 'react';
import { Page } from '../types';
import { ShieldCheckIcon, UserIcon, DocumentTextIcon, HomeIcon } from '../assets/icons';

interface RegisterPageProps {
    onNavigate: (page: Page) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
    const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        cr: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate registration
        console.log('Registering:', { userType, ...formData });
        alert('Cadastro realizado com sucesso! Aguarde a aprovação da nossa equipe de compliance.');
        onNavigate('home');
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-4xl w-full space-y-8 bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-white uppercase tracking-wider">
                        Crie sua Conta <span className="text-arsenal-red">Arsenal</span>
                    </h2>
                    <p className="mt-2 text-gray-400">
                        Junte-se à maior comunidade de atiradores e colecionadores do Brasil.
                    </p>
                </div>

                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setUserType('buyer')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${userType === 'buyer'
                            ? 'bg-arsenal-red text-white shadow-lg shadow-red-900/50'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                            }`}
                    >
                        <UserIcon className="h-5 w-5" />
                        Comprador / Atirador
                    </button>
                    <button
                        onClick={() => setUserType('seller')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${userType === 'seller'
                            ? 'bg-arsenal-red text-white shadow-lg shadow-red-900/50'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                            }`}
                    >
                        <ShieldCheckIcon className="h-5 w-5" />
                        Vendedor / Loja
                    </button>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Info */}
                        <div className="col-span-2 md:col-span-1 space-y-4">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-gray-700 pb-2">
                                <UserIcon className="h-5 w-5 text-arsenal-red" />
                                Dados Pessoais
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Nome Completo</label>
                                <input name="name" type="text" required className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-arsenal-red focus:border-arsenal-red" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Email</label>
                                <input name="email" type="email" required className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-arsenal-red focus:border-arsenal-red" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">CPF</label>
                                <input name="cpf" type="text" required placeholder="000.000.000-00" className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-arsenal-red focus:border-arsenal-red" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">CR (Certificado de Registro)</label>
                                <input name="cr" type="text" placeholder="Opcional para acessórios" className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-arsenal-red focus:border-arsenal-red" onChange={handleChange} />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="col-span-2 md:col-span-1 space-y-4">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-gray-700 pb-2">
                                <HomeIcon className="h-5 w-5 text-arsenal-red" />
                                Endereço
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">CEP</label>
                                <input name="zip" type="text" required className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-arsenal-red focus:border-arsenal-red" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Endereço Completo</label>
                                <input name="address" type="text" required className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-arsenal-red focus:border-arsenal-red" onChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">Cidade</label>
                                    <input name="city" type="text" required className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-arsenal-red focus:border-arsenal-red" onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">Estado</label>
                                    <input name="state" type="text" required className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-arsenal-red focus:border-arsenal-red" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="space-y-4 pt-4 border-t border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Senha</label>
                                <input name="password" type="password" required className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-arsenal-red focus:border-arsenal-red" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Confirmar Senha</label>
                                <input name="confirmPassword" type="password" required className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-lg py-3 px-4 text-white focus:ring-arsenal-red focus:border-arsenal-red" onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Documents Upload Simulation */}
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-dashed border-gray-600 text-center">
                        <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-500" />
                        <p className="mt-2 text-sm text-gray-400">
                            Arraste e solte seus documentos aqui (RG, CPF, Comprovante de Residência, CR)
                        </p>
                        <button type="button" className="mt-4 text-arsenal-red font-bold hover:underline">
                            Selecionar Arquivos
                        </button>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-6">
                        <button
                            type="button"
                            onClick={() => onNavigate('home')}
                            className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-arsenal-red to-red-700 text-white shadow-lg shadow-red-900/50 hover:scale-105 transition-all"
                        >
                            Finalizar Cadastro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
