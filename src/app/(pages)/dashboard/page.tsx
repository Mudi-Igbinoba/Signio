'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { CloudAlert, CloudUpload, Trash2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';

export default function Dashboard() {
  const id = nanoid();
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);
  const pdfData: {
    id: string;
    file: File;
  }[] = JSON.parse(localStorage.getItem('pdfData') || '[]');

  const onDrop = useCallback((accepted: File[], rejected: FileRejection[]) => {
    console.log(accepted, 'accepted');
    console.log(rejected, 'rejected');

    setAcceptedFiles(accepted);
    setFileRejections(rejected);

    // Process the accepted files directly
    // accepted.forEach((file: File) => {
    //   console.log(file);
    //   const reader = new FileReader();

    //   reader.onabort = () => console.log('file reading was aborted');
    //   reader.onerror = () => console.log('file reading has failed');
    //   reader.onload = () => {
    //     // Do whatever you want with the file contents
    //     const binaryStr = reader.result;
    //     console.log(binaryStr);
    //   };
    //   reader.readAsArrayBuffer(file);
    // });
  }, []);

  const handleReset = () => {
    setAcceptedFiles([]);
    setFileRejections([]);
  };

  const handleSubmit = () => {
    const fileData = {
      file: acceptedFiles[0],
      id
    };

    localStorage.setItem('pdfData', JSON.stringify([...pdfData, fileData]));
  };

  return (
    <section className='flex flex-col gap-4 justify-center items-center h-full'>
      <p className='font-display'>Upload your Documents below</p>
      <Dropzone
        maxFiles={1}
        accept={{ 'application/pdf': ['.pdf'] }}
        onDrop={onDrop}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={clsx(
              'border-2 border-dotted rounded-2xl bg-gray-100 hover:bg-gray-300 focus:bg-gray-300 flex flex-col justify-center items-center gap-y-4 w-2/5 h-64 p-10 text-center text-sm duration-300 ease-in-out',
              {
                'border-destructive': fileRejections.length,
                'border-neutral-400 focus:border-foreground hover:border-foreground':
                  !fileRejections.length
              }
            )}
          >
            <input {...getInputProps()} disabled={acceptedFiles.length > 0} />

            {!acceptedFiles.length ? (
              <div className='cursor-pointer'>
                <div className='space-y-4 cursor-pointer'>
                  <p>Drag and drop</p>
                  <p>or</p>
                  <p>Click to upload instead</p>
                </div>
              </div>
            ) : (
              <div className='space-y-4'>
                <p>
                  <CloudUpload className='inline-block' />
                </p>
                <p>{acceptedFiles[0].name}</p>

                <Button
                  type='reset'
                  className='bg-transparent cursor-pointer text-destructive hover:bg-white'
                  size={'icon'}
                  onClick={handleReset}
                >
                  <Trash2 />
                </Button>
              </div>
            )}
          </div>
        )}
      </Dropzone>

      <Link
        href={`/edit/${id}`}
        onClick={handleSubmit}
        className={cn(
          buttonVariants({ variant: 'default', size: 'lg' }),
          'rounded-full cursor-pointer',
          {
            'pointer-events-none opacity-50 cursor-not-allowed':
              !acceptedFiles.length
          }
        )}
      >
        Next{' '}
      </Link>

      {fileRejections.length ? (
        <p className='text-destructive text-xs'>
          <CloudAlert className='inline-block size-4' />{' '}
          {fileRejections[0].errors[0]?.message}
        </p>
      ) : null}
    </section>
  );
}
