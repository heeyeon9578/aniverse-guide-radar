
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [emailConfirmationError, setEmailConfirmationError] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setEmailConfirmationError(false);
    
    try {
      const { error } = await signIn(values.email, values.password);
      if (error) {
        if (error.message === 'Email not confirmed') {
          setEmailConfirmationError(true);
          toast.error('이메일 인증이 필요합니다. 이메일을 확인해주세요.');
        } else {
          toast.error('로그인 실패: ' + error.message);
        }
      } else {
        toast.success('로그인 성공!');
      }
    } catch (err) {
      toast.error('로그인 과정에서 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">로그인</h2>
        <p className="mt-2 text-sm text-gray-600">애니메이션 타임에 오신 것을 환영합니다.</p>
      </div>

      {emailConfirmationError && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <InfoIcon className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            이메일 인증이 필요합니다. 가입시 입력한 이메일을 확인해 주세요.
            <br />
            <span className="text-xs mt-1 block">
              개발 테스트 중이라면 Supabase 대시보드에서 이메일 인증을 비활성화할 수 있습니다.
            </span>
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder="이메일 주소" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="비밀번호" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-anime-primary" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
