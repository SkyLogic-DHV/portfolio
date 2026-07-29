import { getAdminSession, type JwtPayload } from "./auth";

/**
 * Returns the current admin session or throws if unauthenticated.
 *
 * This is intended for use inside Node.js runtime code (API routes,
 * server components, server actions) where Prisma and `next/headers`
 * are available. The Edge/Proxy layer handles the fast JWT cookie
 * check separately in `src/proxy.ts`.
 */
export async function requireAdmin(): Promise<JwtPayload> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}