import React from 'react';
import { motion } from 'framer-motion';

const CollectorsSection: React.FC = () => {
    const rareItems = [
        {
            id: 1,
            name: "Colt Python 1955 Royal Blue",
            price: "R$ 45.000,00",
            image: "https://images.unsplash.com/photo-1585562104169-7f5d18f3d178?auto=format&fit=crop&q=80&w=1000",
            tag: "Raridade Absoluta"
        },
        {
            id: 2,
            name: "Winchester 1873 Original",
            price: "R$ 120.000,00",
            image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=1000",
            tag: "Peça de Museu"
        },
        {
            id: 3,
            name: "Luger P08 Artilharia",
            price: "R$ 85.000,00",
            image: "https://images.unsplash.com/photo-1584039257564-44c747d21f82?auto=format&fit=crop&q=80&w=1000",
            tag: "Guerra Mundial"
        }
    ];

    return (
        <section id="collectors-section" className="relative py-20 bg-gray-900 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 via-transparent to-gray-900 z-10"></div>

            <div className="container mx-auto px-4 relative z-20">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-amber-500 font-bold tracking-[0.2em] uppercase text-sm mb-2 block">
                            Exclusividade & História
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-serif">
                            Área do <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600">Colecionador</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Um espaço dedicado aos apreciadores da história e da engenharia.
                            Negocie peças raras, troque conhecimentos e expanda seu acervo pessoal.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {rareItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <div className="relative bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-colors duration-300 h-full flex flex-col">
                                <div className="h-64 overflow-hidden relative">
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 z-10">
                                        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">{item.tag}</span>
                                    </div>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 font-serif">{item.name}</h3>
                                        <p className="text-amber-500 text-2xl font-bold mb-4">{item.price}</p>
                                    </div>
                                    <button className="w-full py-3 px-4 bg-transparent border border-gray-600 hover:border-amber-500 text-gray-300 hover:text-amber-400 rounded-lg transition-all duration-300 uppercase text-sm font-bold tracking-wider">
                                        Ver Detalhes
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all uppercase tracking-wide"
                    >
                        Explorar Acervo Completo
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-transparent border-2 border-amber-600/50 text-amber-500 font-bold rounded-xl hover:bg-amber-600/10 transition-all uppercase tracking-wide"
                    >
                        Anunciar Relíquia
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default CollectorsSection;
