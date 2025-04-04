import { clerkMiddleware, createRouteMatcher, } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect({
      unauthorizedUrl: '/sign-in',
    });
  }
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
