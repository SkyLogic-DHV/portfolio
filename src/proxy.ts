import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'skylogic-secret-key-2026-production-ready';

/**
 * Proxy (formerly middleware) that protects admin routes.
 *
 * In Next.js 16, `middleware` is deprecated and renamed to `proxy`.
 * Proxy defaults to the Node.js runtime, but we intentionally avoid
 * importing Prisma here to keep the proxy lightweight and to prevent
 * Edge/Node bundling issues with the generated Prisma client.
 *
 * Auth is handled by verifying the JWT stored in the `skylogic_token`
 * cookie. Database-backed checks are performed inside the API routes
 * and server components (Node runtime) via `requireAdmin`.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected =
    pathname.startsWith('/admin') || pathname.startsWith('/api/admin');

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get('skylogic_token')?.value;

  if (!token) {
    return handleUnauthorized(request, pathname);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      username: string;
      email: string;
      role: string;
    };

    if (!payload || !payload.userId) {
      return handleUnauthorized(request, pathname);
    }

    // Forward the verified user info to downstream handlers via headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-email', payload.email);
    requestHeaders.set('x-user-role', payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    return handleUnauthorized(request, pathname);
  }
}

function handleUnauthorized(request: NextRequest, pathname: string) {
  // For API routes, return a JSON 401 response
  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // For page routes, redirect to login
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};