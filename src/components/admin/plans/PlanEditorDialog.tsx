
import React from 'react';
import { Plan } from '@/types/plan';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PlanEditor from './PlanEditor';

interface PlanEditorDialogProps {
  plan: Plan | undefined;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (plan: Plan) => void;
}

const PlanEditorDialog: React.FC<PlanEditorDialogProps> = ({ 
  plan, 
  isOpen, 
  onOpenChange, 
  onSave 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <PlanEditor
          plan={plan}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PlanEditorDialog;
