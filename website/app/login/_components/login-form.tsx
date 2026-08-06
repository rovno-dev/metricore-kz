"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import {
  emailPasswordLogin,
  phoneLogin,
  verifyPhoneOTP,
} from '@/lib/api/auth';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { z } from 'zod';
import Link from 'next/link';

type AuthMethod = 'email' | 'phone';

// Atomic schemas
const emailSchema = z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address');
const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number (E.164 format)');
const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');
const otpSchema = z.string().length(6, 'OTP must be 6 digits');

// Object schemas for validation with named fields
const emailLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const phoneLoginSchema = z.object({
  phone: phoneSchema,
});

const otpVerifySchema = z.object({
  otp: otpSchema,
});

// Helper to extract error message and field from fetch response
function parseFieldError(err: any, status?: number): { field?: string; message: string } {
  // If status is 500, return generic server error
  if (status === 500) {
    return { message: 'Server error. Please try again later.' };
  }

  const fallback = { message: 'Unknown error' };
  if (!err) return fallback;

  let detail: any = null;
  if (typeof err === 'string') {
    try {
      const parsed = JSON.parse(err);
      if (parsed.detail) detail = parsed.detail;
      else if (parsed.msg) return { message: parsed.msg };
    } catch { }
  } else if (err.message) {
    try {
      const parsed = JSON.parse(err.message);
      if (parsed.detail) detail = parsed.detail;
      else if (parsed.msg) return { message: parsed.msg };
    } catch { }
  }

  if (detail) {
    // Handle FastAPI validation errors (array of objects)
    if (Array.isArray(detail)) {
      const fieldErrors: { field?: string; message: string }[] = detail.map((d: any) => {
        const field = d.loc?.[1];
        const msg = d.msg || 'Validation error';
        return { field, message: msg };
      });
      if (fieldErrors.length === 1) {
        return { field: fieldErrors[0].field, message: fieldErrors[0].message };
      }
      const messages = fieldErrors.map(e => e.message).join(', ');
      return { message: messages };
    }
    if (typeof detail === 'string') {
      const lower = detail.toLowerCase();
      if (lower.includes('email') || lower.includes('user')) {
        return { field: 'email', message: detail };
      }
      if (lower.includes('password') || lower.includes('credentials')) {
        return { field: 'password', message: detail };
      }
      if (lower.includes('phone')) {
        return { field: 'phone', message: detail };
      }
      if (lower.includes('otp')) {
        return { field: 'otp', message: detail };
      }
      return { message: detail };
    }
  }
  return fallback;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [method, setMethod] = useState<AuthMethod>(
    (searchParams.get('method') as AuthMethod) || 'email'
  );
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string; phone?: string; otp?: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const isEmailValid = email.trim() !== '' && password.trim() !== '';
  const isPhoneValid = phone.trim() !== '' && (!otpSent || otp.trim() !== '');
  const isValid = method === 'email' ? isEmailValid : isPhoneValid;

  // Clear errors when input changes
  useEffect(() => {
    setErrors({});
    setGeneralError(null);
  }, [email, password, phone, otp]);

  // Sync URL with method state
  useEffect(() => {
    const currentMethod = searchParams.get('method') || 'email';
    if (currentMethod !== method) {
      const params = new URLSearchParams(searchParams);
      params.set('method', method);
      router.replace(`/login?${params.toString()}`, { scroll: false });
    }
  }, [method, searchParams, router]);

  const handleEmailLogin = async () => {
    setErrors({});
    setGeneralError(null);
    try {
      emailLoginSchema.parse({ email, password });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const field = error.issues[0].path[0] as string;
        setErrors({ [field]: error.issues[0].message });
        return;
      }
    }

    setLoading(true);
    try {
      const res = await emailPasswordLogin(email, password);
      login(res);
      router.push('/');
      toast.success('Logged in successfully');
    } catch (err: any) {
      const status = err?.status || (err?.response?.status);
      const { field, message } = parseFieldError(err, status);
      if (field) {
        setErrors({ [field]: message });
      } else {
        setGeneralError(message);
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLoginSendOTP = async () => {
    setErrors({});
    setGeneralError(null);
    try {
      phoneLoginSchema.parse({ phone });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors({ phone: error.issues[0].message });
        return;
      }
    }

    setLoading(true);
    try {
      await phoneLogin(phone);
      setOtpSent(true);
      toast.success('OTP sent to your phone');
    } catch (err: any) {
      const status = err?.status || (err?.response?.status);
      const { field, message } = parseFieldError(err, status);
      if (field) {
        setErrors({ [field]: message });
      } else {
        setGeneralError(message);
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLoginVerify = async () => {
    setErrors({});
    setGeneralError(null);
    try {
      otpVerifySchema.parse({ otp });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors({ otp: error.issues[0].message });
        return;
      }
    }

    setLoading(true);
    try {
      const res = await verifyPhoneOTP(phone, otp);
      login(res);
      router.push('/');
      toast.success('Logged in successfully');
    } catch (err: any) {
      const status = err?.status || (err?.response?.status);
      const { field, message } = parseFieldError(err, status);
      if (field) {
        setErrors({ [field]: message });
      } else {
        setGeneralError(message);
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (method === 'email') {
      handleEmailLogin();
    } else {
      if (!otpSent) {
        handlePhoneLoginSendOTP();
      } else {
        handlePhoneLoginVerify();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const buttonLabel = () => {
    if (loading) return <Spinner />;
    if (method === 'email') return 'Sign in';
    return otpSent ? 'Verify OTP' : 'Send OTP';
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <Container className="max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <h1 className="text-display-3 font-heading mb-6">Sign in</h1>

          <div className="flex border-b border-border mb-6">
            <button
              className={`flex-1 pb-2 text-sm font-medium transition-colors ${method === 'email'
                  ? 'border-b-2 border-primary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
              onClick={() => setMethod('email')}
            >
              Email
            </button>
            <button
              className={`flex-1 pb-2 text-sm font-medium transition-colors ${method === 'phone'
                  ? 'border-b-2 border-primary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
              onClick={() => setMethod('phone')}
            >
              SMS
            </button>
          </div>

          {method === 'email' && (
            <div className="space-y-4" onKeyDown={handleKeyDown}>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>
          )}

          {method === 'phone' && (
            <div className="space-y-4" onKeyDown={handleKeyDown}>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <PhoneInput
                  id="phone"
                  value={phone}
                  onChange={setPhone}
                  country="RU"
                  className="w-full"
                  inputClassName={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
              {otpSent && (
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className={errors.otp ? 'border-red-500' : ''}
                  />
                  {errors.otp && (
                    <p className="text-sm text-red-500">{errors.otp}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {generalError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {generalError}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="w-full mt-6"
            size="large"
          >
            {buttonLabel()}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-primary underline-offset-4 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}