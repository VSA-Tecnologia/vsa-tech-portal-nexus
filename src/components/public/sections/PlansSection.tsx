
import React from 'react';
import { Check, Cloud, Server, Database, Wifi, HardDrive, Backup, Hotspot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePlansStore } from '@/stores/plansStore';

const serviceTypeIcons: Record<string, React.ReactNode> = {
  cloud: <Cloud className="h-6 w-6 text-blue-500" />,
  server: <Server className="h-6 w-6 text-purple-500" />,
  database: <Database className="h-6 w-6 text-green-500" />,
  wifi: <Wifi className="h-6 w-6 text-indigo-500" />,
  'hard-drive': <HardDrive className="h-6 w-6 text-yellow-500" />,
  backup: <Backup className="h-6 w-6 text-teal-500" />,
  hotspot: <Hotspot className="h-6 w-6 text-orange-500" />,
};

const serviceTypeBackgrounds: Record<string, string> = {
  cloud: 'bg-blue-50',
  server: 'bg-purple-50',
  database: 'bg-green-50',
  wifi: 'bg-indigo-50',
  'hard-drive': 'bg-yellow-50',
  backup: 'bg-teal-50',
  hotspot: 'bg-orange-50',
};

const PlansSection: React.FC = () => {
  const { plans } = usePlansStore();
  
  // Filter plans that are published and sort by order
  const publishedPlans = plans
    .filter((plan) => plan.status === 'published')
    .sort((a, b) => a.order - b.order);
  
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
          {publishedPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`
                overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
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
              
              <CardHeader className="pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-vsa-blue">{plan.name}</CardTitle>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </div>
                  <div className={`p-3 rounded-full ${serviceTypeBackgrounds[plan.serviceType]}`}>
                    {serviceTypeIcons[plan.serviceType]}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-vsa-teal mb-6">{plan.price}</div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.id} className="flex items-start">
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
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-vsa-teal hover:bg-vsa-teal-dark' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
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
