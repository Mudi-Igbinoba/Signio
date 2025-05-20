import { Footer } from '../ui/Footer';
import { Header } from '../ui/Header';

export default function PageLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='h-[inherit] flex flex-col'>
      <Header />
      <main className='p-5 flex-1'>{children}</main>
      <Footer />
    </section>
  );
}
