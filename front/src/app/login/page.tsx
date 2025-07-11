import * as React from 'react';
import { LoginForm } from './_components/login-form';

export default function LoginPage() {
  return <React.Suspense fallback={<div>Carregando...</div>}>
      <LoginForm />
    </React.Suspense>;
}
