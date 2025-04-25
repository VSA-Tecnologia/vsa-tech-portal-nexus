
import React from 'react';
import { 
  Users, Mail, Eye, ArrowUpRight, ArrowDownRight, Activity, 
  DollarSign, Calendar, BarChart4
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for the dashboard
  const stats = [
    {
      title: 'Visitas Totais',
      value: '2,856',
      change: '+12.5%',
      increasing: true,
      icon: <Eye className="h-5 w-5" />
    },
    {
      title: 'Mensagens Novas',
      value: '4',
      change: '+28.4%',
      increasing: true,
      icon: <Mail className="h-5 w-5" />
    },
    {
      title: 'Usuários',
      value: '12',
      change: '+3.1%',
      increasing: true,
      icon: <Users className="h-5 w-5" />
    },
    {
      title: 'Conversões',
      value: '38',
      change: '-5.2%',
      increasing: false,
      icon: <Activity className="h-5 w-5" />
    }
  ];
  
  // Mock data for the chart
  const chartData = [
    { name: 'Jan', visitas: 400, mensagens: 5 },
    { name: 'Fev', visitas: 300, mensagens: 8 },
    { name: 'Mar', visitas: 500, mensagens: 12 },
    { name: 'Abr', visitas: 700, mensagens: 4 },
    { name: 'Mai', visitas: 600, mensagens: 10 },
    { name: 'Jun', visitas: 800, mensagens: 6 },
    { name: 'Jul', visitas: 1000, mensagens: 15 },
  ];
  
  // Mock data for recent activities
  const recentActivities = [
    { id: 1, type: 'message', text: 'Nova mensagem de contato recebida', time: '5 minutos atrás' },
    { id: 2, type: 'user', text: 'Novo usuário cadastrado', time: '2 horas atrás' },
    { id: 3, type: 'content', text: 'Conteúdo da seção Serviços atualizado', time: '1 dia atrás' },
    { id: 4, type: 'message', text: 'Nova mensagem de contato recebida', time: '1 dia atrás' },
    { id: 5, type: 'content', text: 'Conteúdo da seção Sobre atualizado', time: '3 dias atrás' },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo, {user?.name}! Aqui está o resumo da sua plataforma.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.increasing ? 'bg-green-100' : 'bg-red-100'}`}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs flex items-center mt-1 font-medium">
                {stat.increasing ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-600" />
                )}
                <span className={stat.increasing ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                {' '}
                <span className="text-muted-foreground">comparado ao mês passado</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Visitas ao Site</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="visitas" 
                  stroke="#0EA5E9" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="mensagens" 
                  stroke="#8B5CF6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="mr-3">
                    {activity.type === 'message' && (
                      <div className="p-1.5 rounded-full bg-vsa-teal/20 text-vsa-teal">
                        <Mail className="h-4 w-4" />
                      </div>
                    )}
                    {activity.type === 'user' && (
                      <div className="p-1.5 rounded-full bg-vsa-purple/20 text-vsa-purple">
                        <Users className="h-4 w-4" />
                      </div>
                    )}
                    {activity.type === 'content' && (
                      <div className="p-1.5 rounded-full bg-vsa-blue/20 text-vsa-blue">
                        <BarChart4 className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="p-2 bg-green-100 rounded-full mr-3">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Conversões do Mês</CardTitle>
              <p className="text-sm text-muted-foreground">Dados de lead capture</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-3">38</div>
            <div className="h-2 w-full bg-gray-100 rounded-full mb-2">
              <div className="h-2 rounded-full bg-green-500" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm text-muted-foreground">75% da meta mensal atingida</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="p-2 bg-blue-100 rounded-full mr-3">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Novos Visitantes</CardTitle>
              <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-3">1,248</div>
            <div className="h-2 w-full bg-gray-100 rounded-full mb-2">
              <div className="h-2 rounded-full bg-blue-500" style={{ width: '65%' }}></div>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-green-600 font-medium">↑ 12%</span> desde o mês passado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="p-2 bg-purple-100 rounded-full mr-3">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Compromissos</CardTitle>
              <p className="text-sm text-muted-foreground">Próximos 7 dias</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-3">8</div>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span>Reuniões</span>
                <span className="font-medium">5</span>
              </li>
              <li className="flex justify-between text-sm">
                <span>Apresentações</span>
                <span className="font-medium">2</span>
              </li>
              <li className="flex justify-between text-sm">
                <span>Entregas</span>
                <span className="font-medium">1</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
