'use client';
import { useAuth } from '@clerk/nextjs';
import DashboardPage from './dashboard/page';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Features } from '@/components/Features';
import { Hero } from '@/components/Hero';
import { SignInButton } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {isSignedIn ? (
        <DashboardPage />
      ) : (
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Hero />
              <div className="flex justify-center gap-4">
                {/* Sign In Button */}
                <SignInButton mode="modal">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </SignInButton>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Features />
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
