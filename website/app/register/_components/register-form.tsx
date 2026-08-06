"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import {
  registerEmail,
  registerPhone,
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

const emailSchema = z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address');
const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number (E.164 format)');
const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');

// Object schemas for validation with named fields
const emailFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const phoneFormSchema = z.object({
  phone: phoneSchema,
  password: passwordSchema,
});

// Helper to extract error message and field from fetch response
function parseFieldError(err: any, status?: number): { field?: string; message: string } {
  if (status === 500) {
    return { message: 'Server error. Please try again later.' };
  }

  const fallback = { message: 'Unknown error' };
  if (!err) return fallback;

  // If err is a string, try to parse JSON
  let detail: any = null;
  if (typeof err === 'string') {
    try {
      const parsed = JSON.parse(err);
      detail = parsed;
    } catch {
      return { message: err };
    }
  } else if (err.message) {
    try {
      const parsed = JSON.parse(err.message);
      detail = parsed;
    } catch {
      return { message: err.message };
    }
  } else {
    detail = err;
  }

  // Handle different error shapes
  if (typeof detail === 'string') {
    const lower = detail.toLowerCase();
    if (lower.includes('email')) return { field: 'email', message: detail };
    if (lower.includes('phone')) return { field: 'phone', message: detail };
    if (lower.includes('password')) return { field: 'password', message: detail };
    return { message: detail };
  }

  // Handle object with field keys (e.g., { "email": "User with this email already exists" })
  if (typeof detail === 'object' && detail !== null) {
    // Check if there's a field key like 'email', 'phone', 'password'
    // Handle FastAPI format: { detail: { field: "message" } }
    // Check if there's a field key like 'email', 'phone', 'password'
    if (detail.detail && typeof detail.detail === 'object' && detail.detail !== null) {
      // Check if there's a field key like 'email', 'phone', 'password'
      detail = detail.detail;
      // Check if there's a field key like 'email', 'phone', 'password'
    }
    // Check if there's a field key like 'email', 'phone', 'password'
    const fieldKeys = ['email', 'phone', 'password'];
    for (const key of fieldKeys) {
      if (detail[key] && typeof detail[key] === 'string') {
        return { field: key, message: detail[key] };
      }
    }
    // If no matching field, take the first value
    const firstKey = Object.keys(detail)[0];
    if (firstKey && typeof detail[firstKey] === 'string') {
      return { field: firstKey, message: detail[firstKey] };
    }
    return { message: JSON.stringify(detail) };
  }

  // Handle array of errors (FastAPI style)
  if (Array.isArray(detail)) {
    const msgs = detail.map((d: any) => d.msg).filter(Boolean);
    if (msgs.length > 0) {
      const fields = detail.map((d: any) => d.loc?.[1]).filter(Boolean);
      if (fields.length > 0 && fields.every(f => f === fields[0])) {
        return { field: fields[0] as string, message: msgs.join(', ') };
      }
      return { message: msgs.join(', ') };
    }
  }

  return fallback;
}

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [method, setMethod] = useState<AuthMethod>(
    (searchParams.get('method') as AuthMethod) || 'email'
  );
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string; password?: string }>({});

  const isValid = method === 'email'
    ? email.trim() !== '' && password.trim() !== ''
    : phone.trim() !== '' && password.trim() !== '';

  // Clear errors when input changes
  useEffect(() => {
    setErrors({});
  }, [email, password, phone]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  // Sync URL with method state
  useEffect(() => {
    const currentMethod = searchParams.get('method') || 'email';
    if (currentMethod !== method) {
      const params = new URLSearchParams(searchParams);
      params.set('method', method);
      router.replace(`/register?${params.toString()}`, { scroll: false });
    }
  }, [method, searchParams, router]);

  const handleRegister = async () => {
    setErrors({});
    try {
      if (method === 'email') {
        emailFormSchema.parse({ email, password });
      } else {
        phoneFormSchema.parse({ phone, password });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const field = error.issues[0].path[0] as string;
        setErrors({ [field]: error.issues[0].message });
        return;
      }
    }

    setLoading(true);
    try {
      let res;
      if (method === 'email') {
        res = await registerEmail(email, password);
      } else {
        res = await registerPhone(phone, password);
      }
      // Only call login if registration succeeded (no error thrown)
      login(res);
      router.push('/');
      toast.success('Account created and logged in');
    } catch (err: any) {
      console.error('[Register] Error:', err);
      const status = err?.status || (err?.response?.status);
      const { field, message } = parseFieldError(err, status);
      if (field) {
        setErrors({ [field]: message });
        toast.error(message); // Also show toast for visibility
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <Container className="max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <h1 className="text-display-3 font-heading mb-6">Create account</h1>

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
            <div className="space-y-4">
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
            <div className="space-y-4">
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

          <Button
            onClick={handleRegister}
            disabled={!isValid || loading}
            className="w-full mt-6"
            variant="filled"
            size="large"
          >
            {loading ? <Spinner /> : 'Create account'}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}