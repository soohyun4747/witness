import { createHmac } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Role } from './types';

const COOKIE_NAME = 'witness_session';
const SECRET = process.env.AUTH_SECRET || 'dev-secret';

type Session = { userId: string; email: string; role: Role; exp: number };

function encode(data: Omit<Session, 'exp'>, ttlSeconds = 60 * 60 * 8) {
  const payload: Session = { ...data, exp: Math.floor(Date.now() / 1000) + ttlSeconds };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', SECRET).update(body).digest('base64url');
  return `${body}.${sig}`;
}
function decode(token: string): Session | null {
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = createHmac('sha256', SECRET).update(body).digest('base64url');
  if (expected !== sig) return null;
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as Session;
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

export async function createSession(userId: string, email: string, role: Role) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, encode({ userId, email, role }), { httpOnly: true, sameSite: 'lax', path: '/' });
}
export async function clearSession() { const jar = await cookies(); jar.delete(COOKIE_NAME); }
export async function getSession() { const jar = await cookies(); const token = jar.get(COOKIE_NAME)?.value; return token ? decode(token) : null; }
export async function requireSession(roles?: Role[]) {
  const session = await getSession();
  if (!session) redirect('/login');
  if (roles && !roles.includes(session.role)) redirect('/admin');
  return session;
}
