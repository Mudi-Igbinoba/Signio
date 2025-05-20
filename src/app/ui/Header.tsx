import Link from 'next/link';

export const Header = () => {
  return (
    <header className='sticky bg-white top-0 py-4 border-b  shadow text-center font-display text-3xl font-bold'>
      <Link href='/'>Signio</Link>
    </header>
  );
};
