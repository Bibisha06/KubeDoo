import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';
import { Providers } from '@/lib/providers';
import { DevModeIndicator } from '@/components/dev-mode-indicator';

export const metadata: Metadata = {
  title: 'kubedoo',
  description: 'Kubernetes-first, AI-powered incident response and infrastructure management platform.'
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Fetch data server-side
  const user = await getUser();

  return (
    <html
      lang="en"
      className={`dark ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-background" suppressHydrationWarning>
        <Providers>
          <SWRConfig
            value={{
              fallback: {
                '/api/user': user
              }
            }}
          >
            {children}
            <DevModeIndicator />
          </SWRConfig>
        </Providers>
      </body>
    </html>
  );
}
