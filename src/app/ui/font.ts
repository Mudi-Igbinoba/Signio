import { Geist, Geist_Mono, Inknut_Antiqua } from 'next/font/google';

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const inknutAntiqua = Inknut_Antiqua({
  variable: '--font-inknut',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
});
