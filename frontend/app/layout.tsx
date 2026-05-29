import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/Header';


export const metadata: Metadata = {
  title: 'Loja Virtual',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`bg-[#0f1117] text-white min-h-screen`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}