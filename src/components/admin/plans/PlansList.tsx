import React from 'react';
import { CreditCard, Plus, Star, ArrowUp, ArrowDown, MoreVertical, Cloud, Server, Database, Wifi, HardDrive, Archive, Signal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plan } from '@/types/plan';
import { formatDate } from '@/lib/utils';

interface PlansListProps {
  plans: Plan[];
  onCreateNew: () => void;
  onEdit: (plan: Plan) => void;
  onDelete: (planId: number) => void;
  onView: (plan: Plan) => void;
  onToggleFeatured: (planId: number) => void;
  onReorder: (planId: number, direction: 'up' | 'down') => void;
}

const serviceTypeIcons: Record<string, React.ReactNode> = {
  cloud: <Cloud className="h-4 w-4 text-blue-500" />,
  server: <Server className="h-4 w-4 text-purple-500" />,
  database: <Database className="h-4 w-4 text-green-500" />,
  wifi: <Wifi className="h-4 w-4 text-indigo-500" />,
  'hard-drive': <HardDrive className="h-4 w-4 text-yellow-500" />,
  archive: <Archive className="h-4 w-4 text-teal-500" />,
  signal: <Signal className="h-4 w-4 text-orange-500" />,
};

const PlansList: React.FC<PlansListProps> = ({
  plans,
  onCreateNew,
  onEdit,
  onDelete,
  onView,
  onToggleFeatured,
  onReorder,
}) => {
  // Sort plans by order
  const sortedPlans = [...plans].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Planos ({plans.length})</h2>
        <Button onClick={onCreateNew}>
          <Plus className="mr-2 h-4 w-4" /> Novo Plano
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Última Atualização</TableHead>
              <TableHead className="w-[120px]">Ordem</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {plan.popular && (
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    )}
                    {plan.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {serviceTypeIcons[plan.serviceType]}
                    <span className="ml-2 text-sm text-gray-600 capitalize">
                      {plan.serviceType.replace('-', ' ')}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{plan.price}</TableCell>
                <TableCell>
                  <Badge variant={plan.status === 'published' ? 'secondary' : 'default'} className={plan.status === 'published' ? 'bg-green-500 hover:bg-green-600' : ''}>
                    {plan.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(plan.updatedAt)}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onReorder(plan.id, 'up')}
                      disabled={plan.order === 1}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onReorder(plan.id, 'down')}
                      disabled={plan.order === sortedPlans.length}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Opções</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onView(plan)}>
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(plan)}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onToggleFeatured(plan.id)}>
                        {plan.popular ? 'Remover destaque' : 'Destacar plano'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDelete(plan.id)}
                      >
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PlansList;
