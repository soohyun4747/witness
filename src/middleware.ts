import { NextRequest, NextResponse } from 'next/server';

const ADMIN_ROLES = ['ADMIN', 'STAFF', 'AUDITOR'];

function parseRole(token?: string) {
  if (!token) return null;
  const [body] = token.split('.');
  if (!body) return null;
  try {
    const base64 = body.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '='));
    return JSON.parse(decoded).role as string;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/admin')) return NextResponse.next();
  const token = req.cookies.get('witness_session')?.value;
  const role = parseRole(token);
  if (!role) return NextResponse.redirect(new URL('/login', req.url));
  if (!ADMIN_ROLES.includes(role)) return NextResponse.redirect(new URL('/login', req.url));
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
