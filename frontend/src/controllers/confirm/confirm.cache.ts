import { makeVar } from '@apollo/client';

export interface ConfirmStateInterface {
  isOpen: boolean;
  body?: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const confirmModalVar = makeVar<ConfirmStateInterface>({
  isOpen: false,
  onCancel: () => { /* empty */ },
  onConfirm: () => { /* empty */ },
});
