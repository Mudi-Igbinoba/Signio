'use client';

import { Progress } from '@/components/ui/progress';
import { PenTool } from 'lucide-react';
import { use, useEffect, useState } from 'react';

export default function PdfPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);

  const id = params.id;

  const pdfData = JSON.parse(localStorage.getItem('pdfData') || '[]');

  const [progress, setProgress] = useState(0);

  if (progress === 100) {
    console.log(pdfData.find((e: { id: string }) => e.id === id));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer); // Stop the interval when progress reaches 100
          return prev;
        }
        return prev + 1; // Increment progress by 1
      });
    }, 50); // Update progress every 100ms

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  if (progress < 100) {
    return (
      <div className='flex flex-col gap-y-2 h-full justify-center items-center'>
        <div className='flex justify-center'>
          <PenTool className='mx-auto text-center block animate-bounce' />
        </div>
        <p>Loading</p>
        <br />
        <Progress value={progress} className='w-4/5 shadow-2xl' />
      </div>
    );
  }

  return <div className='flex justify-center items-center'>PDF</div>;
}
