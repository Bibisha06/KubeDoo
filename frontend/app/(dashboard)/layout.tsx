import { Suspense } from 'react';
import { Navigation } from '@/components/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen bg-background text-foreground">
      <Suspense fallback={<div className="h-16 border-b border-border" />}>
        <Navigation />
      </Suspense>
      <main className="flex-1">
        {children}
      </main>
    </section>
  );
}
