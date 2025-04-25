
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlanFeature {
  feature: string;
  included: boolean;
}

interface Plan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  buttonText: string;
}

const plans: Plan[] = [
  {
    id: 1,
    name: 'Starter',
    price: 'R$ 1.999/mês',
    description: 'Ideal para pequenas empresas iniciando na transformação digital',
    features: [
      { feature: 'Infraestrutura básica de TI', included: true },
      { feature: 'Suporte 8x5', included: true },
      { feature: 'Site responsivo', included: true },
      { feature: 'Email corporativo (5 contas)', included: true },
      { feature: 'Backups semanais', included: true },
      { feature: 'Segurança básica', included: true },
      { feature: 'Integrações com ERPs', included: false },
      { feature: 'Monitoramento 24/7', included: false },
    ],
    buttonText: 'Começar agora',
  },
  {
    id: 2,
    name: 'Business',
    price: 'R$ 3.999/mês',
    description: 'Para empresas em fase de crescimento que precisam de mais recursos',
    features: [
      { feature: 'Infraestrutura avançada de TI', included: true },
      { feature: 'Suporte 12x6', included: true },
      { feature: 'Portal corporativo completo', included: true },
      { feature: 'Email corporativo (20 contas)', included: true },
      { feature: 'Backups diários', included: true },
      { feature: 'Segurança avançada', included: true },
      { feature: 'Integrações com ERPs', included: true },
      { feature: 'Monitoramento 24/7', included: false },
    ],
    popular: true,
    buttonText: 'Escolher este plano',
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 'R$ 7.999/mês',
    description: 'Solução completa para grandes empresas com necessidades complexas',
    features: [
      { feature: 'Infraestrutura premium de TI', included: true },
      { feature: 'Suporte 24/7', included: true },
      { feature: 'Portal corporativo + intranet', included: true },
      { feature: 'Email corporativo (ilimitado)', included: true },
      { feature: 'Backups contínuos', included: true },
      { feature: 'Segurança enterprise', included: true },
      { feature: 'Integrações completas', included: true },
      { feature: 'Monitoramento 24/7', included: true },
    ],
    buttonText: 'Fale com um consultor',
  }
];

const PlansSection: React.FC = () => {
  return (
    <section id="plans" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Nossos Planos</h2>
          <p className="section-subtitle">
            Escolha o plano que melhor atende às necessidades da sua empresa
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`
                bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                ${plan.popular ? 'ring-2 ring-vsa-teal relative' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-vsa-teal text-white text-xs font-semibold px-4 py-1 rounded-bl-lg">
                    Mais popular
                  </div>
                </div>
              )}
              
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-vsa-blue mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-vsa-teal mb-2">{plan.price}</div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              
              <div className="p-6">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`flex-shrink-0 rounded-full p-1 ${
                        feature.included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Check className="h-4 w-4" />
                      </div>
                      <span className={`ml-3 ${!feature.included ? 'text-gray-400' : ''}`}>
                        {feature.feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-vsa-teal hover:bg-vsa-teal-dark' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Precisa de um plano personalizado? Entre em contato conosco para discutirmos suas necessidades.
          </p>
          <Button variant="outline" className="border-vsa-teal text-vsa-teal hover:bg-vsa-teal/10">
            Solicitar orçamento personalizado
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
