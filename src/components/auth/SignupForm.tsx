
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

const signupSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
  confirmPassword: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    setSignupSuccess(false);
    
    try {
      const { error } = await signUp(values.email, values.password);
      if (error) {
        toast.error('회원가입 실패: ' + error.message);
      } else {
        setSignupSuccess(true);
        toast.success('회원가입 성공! 이메일 확인 후 로그인해주세요.');
        form.reset();
      }
    } catch (err) {
      toast.error('회원가입 과정에서 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">회원가입</h2>
        <p className="mt-2 text-sm text-gray-600">애니메이션 타임의 회원이 되어보세요.</p>
      </div>

      {signupSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <InfoIcon className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            가입이 완료되었습니다! 입력하신 이메일로 인증 메일이 발송되었습니다.
            <br />
            <span className="text-xs mt-1 block">
              이메일 인증 후 로그인하시거나, Supabase 대시보드에서 이메일 인증을 비활성화할 수 있습니다.
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="비밀번호 확인" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-anime-primary" disabled={isLoading}>
            {isLoading ? '처리 중...' : '회원가입'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
