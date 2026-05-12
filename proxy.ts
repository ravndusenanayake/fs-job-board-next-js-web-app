import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Role-based authorization logic

    // Protect Admin routes
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Protect Recruiter routes
    if (path.startsWith("/recruiter-dashboard") && token?.role !== "RECRUITER") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      // The authorized callback determines if the middleware function above should run
      // If it returns true, the user is authenticated and middleware() runs
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  // Only apply this middleware to the dashboard and admin paths
  matcher: [
    "/admin/:path*",
    "/recruiter-dashboard/:path*",
  ],
};
