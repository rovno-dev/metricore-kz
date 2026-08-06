const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// OTP-based login
export async function emailLogin(email: string) {
  const res = await fetch(`${API_BASE}/api/main/v1/login/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function phoneLogin(phone: string) {
  const res = await fetch(`${API_BASE}/api/main/v1/login/phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function verifyEmailOTP(email: string, code: string) {
  const res = await fetch(`${API_BASE}/api/main/v1/otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login: email, code }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function verifyPhoneOTP(phone: string, code: string) {
  const res = await fetch(`${API_BASE}/api/main/v1/otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login: phone, code }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Password-based login
export async function emailPasswordLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/main/v1/login/email-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function phonePasswordLogin(phone: string, password: string) {
  const res = await fetch(`${API_BASE}/api/main/v1/login/phone-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Registration
export async function registerEmail(email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/main/v1/register/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
  console.log('hui')
  return res.json();
}

export async function registerPhone(phone: string, password: string) {
  const res = await fetch(`${API_BASE}/api/main/v1/register/phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, password }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }
  return res.json();
}

// Token refresh
export async function refreshToken(refresh: string) {
  const res = await fetch(`${API_BASE}/api/main/v1/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refresh }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Token management
export function setTokens(access: string, refresh: string) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
}

export function getTokens() {
  return {
    access: localStorage.getItem('access_token'),
    refresh: localStorage.getItem('refresh_token'),
  };
}

export function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
