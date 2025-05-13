
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const Auth = () => {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // 이미 로그인한 사용자는 홈으로 리다이렉트
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto space-y-8">
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant={authMode === 'login' ? 'default' : 'outline'}
              onClick={() => setAuthMode('login')}
            >
              로그인
            </Button>
            <Button
              variant={authMode === 'signup' ? 'default' : 'outline'}
              onClick={() => setAuthMode('signup')}
            >
              회원가입
            </Button>
          </div>

          {authMode === 'login' ? <LoginForm /> : <SignupForm />}
        </div>
      </main>
      
      <footer className="bg-gray-100 py-6 text-center text-gray-600">
        <p>© 2025 애니메이션 타임. 모든 권리 보유.</p>
      </footer>
    </div>
  );
};

export default Auth;
