import React from 'react';
import Image from 'next/image';

// sometimes api takes a while that the call gets timed out. 
// since the index page relies on an image, this needs to be done so no error in production page 
const Error = () => {
  return (
    <div className='h-screen relative'>

      <Image src="/error.gif" layout='fill' objectFit='cover' priority="true" quality={100} />

      <div className="container mx-auto h-screen">
        <div className='absolute top-1/2 transform -translate-y-1/2'>
          <h1 className='text-4xl md:text-8xl text-center text-white font-bold'>API call timed out.</h1>
          <p className='text-white text-center md:text-left text-lg'>Seems that the NASA APOD API is slow right now. Please try again later!</p>
        </div>
      </div>
    </div>
  )
}

export default Error;