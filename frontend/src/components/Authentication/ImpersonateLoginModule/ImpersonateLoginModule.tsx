import React from 'react';
import AuthForm from '@/components/Authentication/AuthForm/AuthForm.module.scss';
import { ImpersonateLoginForm } from '@/components/Authentication/ImpersonateLoginModule/ImpersonateLoginForm';

export const ImpersonateLoginModule = () => (
  <div className={AuthForm.authFormWrapper}>
    <ImpersonateLoginForm />
  </div>
);
