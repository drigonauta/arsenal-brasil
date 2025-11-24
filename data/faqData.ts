
import { FaqItem, FaqCategory } from '../types';
import { ScaleIcon, ExclamationTriangleIcon, ShoppingCartIcon, DocumentTextIcon, TruckIcon } from '../assets/icons';

export const faqCategories: Omit<FaqCategory, 'count'>[] = [
    { id: 'legislacao', name: 'Legislação e Normas', icon: ScaleIcon },
    { id: 'municao', name: 'Munição', icon: ExclamationTriangleIcon },
    { id: 'compra-venda', name: 'Compra e Venda', icon: ShoppingCartIcon },
    { id: 'documentacao', name: 'Documentação', icon: DocumentTextIcon },
    { id: 'transporte', name: 'Segurança e Transporte', icon: TruckIcon },
];

export const faqItems: FaqItem[] = [
    {
        id: 1,
        question: 'Quem pode comprar armas de fogo no Brasil?',
        answer: 'De acordo com a legislação atual (Decreto Nº 11.615/2023), para adquirir uma arma de fogo de uso permitido, o cidadão deve cumprir os seguintes requisitos:\n\n- Ter no mínimo 25 anos de idade.\n- Apresentar comprovante de residência fixa e de ocupação lícita.\n- Comprovar a efetiva necessidade da aquisição.\n- Não estar respondendo a inquérito policial ou a processo criminal.\n- Não possuir antecedentes criminais.\n- Comprovar capacidade técnica e aptidão psicológica para o manuseio de arma de fogo.',
        category: 'legislacao',
        tags: ['compra', 'requisitos', 'idade', 'lei'],
    },
    {
        id: 2,
        question: 'Qual a diferença entre CAC e Porte de Arma?',
        answer: 'São conceitos distintos:\n\n- **CAC (Caçador, Atirador Desportivo e Colecionador):** É uma pessoa física registrada no Exército para exercer essas atividades. O CAC tem direito ao **Porte de Trânsito**, que o autoriza a transportar a arma do local de guarda (sua residência) até o local de treino, competição ou caça, de forma desmuniciada e acondicionada.\n\n- **Porte de Arma:** É a autorização para portar a arma de fogo consigo, de forma pronta para uso, em locais públicos. É concedido pela Polícia Federal em caráter excepcional, para defesa pessoal, a quem comprovar efetiva necessidade por exercício de atividade profissional de risco ou de ameaça à sua integridade física.',
        category: 'legislacao',
        tags: ['cac', 'porte', 'diferença', 'trânsito'],
    },
    {
        id: 3,
        question: 'O que é o CR (Certificado de Registro)?',
        answer: 'O Certificado de Registro (CR) é o documento emitido pelo Exército Brasileiro que autoriza uma pessoa física ou jurídica a exercer atividades com Produtos Controlados pelo Exército (PCE), como o tiro desportivo, a caça e o colecionismo. O CR é o que torna o cidadão um CAC.',
        category: 'documentacao',
        tags: ['cr', 'certificado', 'registro', 'cac'],
    },
    {
        id: 4,
        question: 'O que é o CRAF?',
        answer: 'O Certificado de Registro de Arma de Fogo (CRAF) é o documento que funciona como a "identidade" da arma. Ele vincula a arma de fogo ao seu proprietário e é obrigatório para todas as armas de fogo em território nacional, sejam elas de uso permitido ou restrito. O CRAF é emitido pela Polícia Federal (para armas do SINARM) ou pelo Exército (para armas do SIGMA).',
        category: 'documentacao',
        tags: ['craf', 'registro', 'arma', 'sinarm', 'sigma'],
    },
    {
        id: 5,
        question: 'Quantas munições posso comprar por ano?',
        answer: 'A quantidade de munições que um CAC pode adquirir anualmente varia conforme o nível do atirador e a legislação vigente. O Decreto 11.615/2023 estabeleceu novos limites. Atiradores de nível 1, por exemplo, podem adquirir até 4.000 cartuchos por ano. É fundamental consultar as portarias do COLOG/Exército para os limites exatos de cada calibre e nível.',
        category: 'municao',
        tags: ['munição', 'limite', 'quantidade', 'cac'],
    },
    {
        id: 6,
        question: 'Como funciona a venda de uma arma usada entre CACs?',
        answer: 'A transferência de armas entre CACs é um processo administrativo realizado através do sistema SIGMA. O vendedor e o comprador devem estar com seus CRs válidos. O processo envolve a solicitação de uma autorização de transferência junto à Região Militar de vinculação. Após a autorização, a arma é transferida no sistema e um novo CRAF é emitido em nome do comprador.',
        category: 'compra-venda',
        tags: ['venda', 'transferência', 'usada', 'cac', 'sigma'],
    },
    {
        id: 7,
        question: 'Como devo transportar minha arma para o clube de tiro?',
        answer: 'O transporte deve ser feito com base no Porte de Trânsito, garantido pela Guia de Tráfego (GT) emitida pelo SIGMA. A arma deve estar desmuniciada, acondicionada em um estojo ou maleta (case), separada da munição. O trajeto deve ser direto do local de guarda autorizado até o local da atividade (treino, competição).',
        category: 'transporte',
        tags: ['transporte', 'gt', 'guia de tráfego', 'segurança'],
    },
    {
        id: 8,
        question: 'Posso usar minha arma de acervo de CAC para defesa pessoal?',
        answer: 'A arma do acervo de CAC, em princípio, destina-se à atividade para a qual foi registrada (tiro desportivo, caça ou coleção). No entanto, dentro de sua residência ou local de trabalho (se for o titular do estabelecimento), o proprietário legal pode usá-la para legítima defesa, conforme previsto no Código Penal. O Porte de Trânsito não autoriza o porte para defesa pessoal em vias públicas.',
        category: 'legislacao',
        tags: ['defesa', 'cac', 'legítima defesa', 'residência'],
    },
];
