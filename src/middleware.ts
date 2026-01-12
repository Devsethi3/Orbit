import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip all static files and internal Next.js routes
    "/((?!_next|favicon.ico|logo.svg|demo-video.mp4|placeholder-poster.jpg|.*\\..*).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};