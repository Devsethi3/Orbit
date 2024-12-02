"use client";

import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, SignIn, useAuth } from "@clerk/clerk-react";
import React from "react";
import { FullScreenLoader } from "@/components/FullScreenLoader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {!isMounted || (isMounted && window.location.pathname === "/") ? (
          children
        ) : (
          <>
            <Authenticated>{children}</Authenticated>
            <Unauthenticated>
              <div className="flex flex-col items-center justify-center h-screen w-full">
                <SignIn routing="hash" />
              </div>
            </Unauthenticated>
            <AuthLoading>
              <FullScreenLoader />
            </AuthLoading>
          </>
        )}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
