import type { Metadata } from 'next';
import './globals.css';
import { geistMono, geistSans, inknutAntiqua } from './ui/font';

export const metadata: Metadata = {
  title: 'Signio',
  description: 'Your favorite document signer annotator'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inknutAntiqua.variable} antialiased font-mono h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
