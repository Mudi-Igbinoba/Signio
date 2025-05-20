import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PenTool } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <section className='h-[inherit] flex justify-center items-center'>
      <div className='container text-center space-y-5'>
        <h1 className='font-display font-bold text-4xl'>Signio</h1>
        <p>Your #1 document assistant.</p>
        <Link
          href='/dashboard'
          className={cn(
            buttonVariants({ variant: 'default', size: 'lg' }),
            'rounded-3xl'
          )}
        >
          <PenTool />
          Begin
        </Link>
      </div>
    </section>
  );
}
