import React from 'react';
import Image from 'next/image';

import type { image } from '../../types/image.interface';

const PictureOfDay = ({ imageResponse, isLiked, onLikeClick, scrollToGallery }: { imageResponse: image, isLiked: boolean, onLikeClick: (url: string, event: React.MouseEvent<HTMLElement>) => void, scrollToGallery: () => void }) => {

  console.log(imageResponse)

  //to show information & deal with parralax
  const [showPictureofDay, setShowPictureofDay] = React.useState(imageResponse.show);
  const [offsetY, setOffsetY] = React.useState(0);

  // callback to update scroll position
  const handleScroll = () => setOffsetY(window.pageYOffset);

  //listener that deals with parralx effect
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div style={{ transform: `translateY(${offsetY * 0.4}px)` }} className={`${showPictureofDay ? 'h-[94%]' : 'h-full'} relative`}>
        {
          imageResponse.media_type === 'image' ?
            <Image className={`${showPictureofDay ? 'rounded-b-[30px]' : 'rounded-none'}  transition-all duration-300`} placeholder='blur' src={imageResponse.title} loader={() => imageResponse.hdurl} layout='fill' objectFit='cover' quality={100} priority={true} blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII=" />
            :
            <iframe
              className='rounded-b-[30px]'
              width="100%"
              height="100%"
              src={imageResponse.url + '&autoplay=1&controls=0&loop=1&playlist=' + imageResponse.url.split('https://www.youtube.com/embed/')[1].split('?rel=0')[0]}
              frameBorder="0"
              title="Embedded youtube"
            />
        }
      </div>

      <section className='absolute p-8 bottom-0 drop-shadow-2xl animate-fadeInBottom'>
        <div className='grid grid-cols-2 gap-4'>
          <div className={`bg-black/40 rounded-lg drop-shadow-2xl p-6 ${showPictureofDay ? 'visible' : 'invisible'}`}>
            <span className='text-white'>{new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <h1 className='font-bold text-white text-7xl align-middle underline pt-1'><a href={imageResponse.hdurl} target='_blank' rel="noreferrer">{imageResponse.title}</a></h1>
            <p className='text-white font-medium pt-7'>{imageResponse.explanation}</p>
          </div>
          <div className='flex justify-end items-end'>
            <div className='flex'>
              <div className='rounded-full p-3 bg-[#181A18] h-max mr-2 drop-shadow-2xl border-white border-2 hover:border-green-500 transition-all duration-200 cursor-pointer' onClick={scrollToGallery}>
                <i className={`uil uil-arrow-down text-4xl text-white`}></i>
              </div>
              <div className='rounded-full p-3 bg-[#181A18] h-max mr-2 drop-shadow-2xl border-white border-2 hover:border-blue-500 transition-all duration-200 cursor-pointer' onClick={() => setShowPictureofDay(!showPictureofDay)}>
                <i className={`${showPictureofDay ? 'uil uil-eye-slash' : 'uil uil-eye'} text-4xl text-white`}></i>
              </div>
              <div className='rounded-full p-3 bg-[#181A18] h-max drop-shadow-2xl border-white border-2 hover:border-red-500 transition-all duration-200 cursor-pointer' onClick={(e) => onLikeClick(imageResponse.hdurl, e)}>
                <i className={`${isLiked ? 'uis uis-heart-alt text-red-900' : 'uil uil-heart text-white'} text-4xl  transition-colors`}></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PictureOfDay;