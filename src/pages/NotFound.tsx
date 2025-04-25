
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-6 max-w-lg">
        <h1 className="text-9xl font-bold text-vsa-blue dark:text-white">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-6 text-vsa-blue dark:text-white">Página não encontrada</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="btn-primary flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Voltar para Home
          </Link>
          <Link 
            to="/admin" 
            className="btn-secondary flex items-center justify-center gap-2"
          >
            Ir para o Painel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
