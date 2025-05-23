import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IFC File Notes',
  description: 'AI-powered file note generation tool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="file-notes-theme"
          >
            <div className="min-h-screen bg-background">
              <Navbar />
              {children}
            </div>
            <Toaster />
            <Analytics /> {/* Add Analytics here to ensure it's loaded globally */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
