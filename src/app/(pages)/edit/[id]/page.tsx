'use client';

import { Progress } from '@/components/ui/progress';
import { PenTool } from 'lucide-react';
import Script from 'next/script';
import { use, useEffect, useState } from 'react';
import ViewSDKClient from '@/lib/ViewSDKClient';

export default function PdfPage(props: { params: Promise<{ id: string }> }) {
  const viewSDKClient = new ViewSDKClient();
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

  useEffect(() => {
    const data = pdfData.find((e: { id: string }) => e.id === id);
    const { name, content, type, lastModified } = data;

    // Decode Base64 content and create a Blob
    const byteString = atob(content.split(',')[1]); // Remove the Base64 prefix
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type });

    // Create a File object from the Blob
    const file = new File([blob], name, { type, lastModified });

    viewSDKClient.ready().then(() => {
      const fileName = file.name;
      const reader = new FileReader();
      reader.onloadend = () => {
        const binaryStr = reader.result;
        const filePromise = Promise.resolve(binaryStr);
        /* Helper function to render the file using PDF Embed API. */
        viewSDKClient.previewFileUsingFilePromise(
          'pdf-div',
          filePromise,
          fileName
        );
      };
      reader.readAsArrayBuffer(file);
    });
  }, [0]);

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

  return (
    <div id='pdf-div' className='flex justify-center items-center h-full '>
      <p>Getting ready....</p>

      <Script
        type='text/javascript'
        src='https://acrobatservices.adobe.com/view-sdk/viewer.js'
      />
    </div>
  );
}
