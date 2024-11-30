'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useAuth, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">IFC File Notes</span>
          </Link>

          {/* Authentication Links */}
          <div className="flex items-center space-x-4">
            {!isSignedIn && (
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  Sign In
                </Button>
              </SignInButton>
            )}

            {isSignedIn && (
              <>
                <UserButton afterSignOutUrl="/" />
                <SignOutButton/>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
