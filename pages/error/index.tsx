import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

// sometimes api takes a while that the call gets timed out. 
// since the index page relies on an image, this needs to be done so no error in production page 
const Error = () => {
  return (
    <>
      <Head>
        <title>Spacetrest: API Timeout Error</title>
        <meta name="description" content="Images about the universe" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className='h-screen relative'>

        <Image src="/error.gif" alt='rotating moon' layout='fill' objectFit='cover' priority={true} quality={100} />

        <div className="container mx-auto h-screen">
          <div className='absolute top-1/2 transform -translate-y-1/2'>
            <h1 className='text-4xl md:text-8xl text-center text-white font-bold'>API call timed out.</h1>
            <p className='text-white text-center md:text-left text-lg mb-3'>Seems that the NASA APOD API is slow right now. Please try again later!</p>
            <Link href="/">
              <a>
                <p className="uil uil-home text-center md:text-left text-4xl text-white cursor-pointer"></p>
              </a>
            </Link>
          </div>
          <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 cursor-pointer">
            <a href='https://github.com/shanerrr/Spacetrest'>
              <Image src="/github.png" alt='github logo' height={25} width={25} objectFit='cover' priority={true} quality={100} />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Error;